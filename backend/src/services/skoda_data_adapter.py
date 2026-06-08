"""
Škoda Data Adapter
------------------
Transforms raw Škoda CSV files into internal employee models.
"""

import re
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import pandas as pd

from src.services.multilingual_normalization_service import MultilingualNormalizationService
from src.middleware.logging_middleware import logger


SKODA_COLUMN_MAPPING = {
    "personal_number": "employee_id",
    "persstat_start_month_abc": "start_date",
    "pers_organization_branch": "organization_branch",
    "pers_profession_id": "profession_id",
    "pers_job_family_id": "job_family_id",
    "s1_org_hierarchy": "org_hierarchy_level_1",
    "s2_org_hierarchy": "org_hierarchy_level_2",
    "s3_org_hierarchy": "org_hierarchy_level_3",
    "s4_org_hierarchy": "org_hierarchy_level_4",
}

REQUIRED_SKODA_COLUMNS = [
    "personal_number",
    "persstat_start_month_abc",
    "pers_organization_branch",
]

QUALIFICATION_COLUMN_PATTERNS = [
    r"qualification",
    r"certification",
    r"certifikace",
    r"kvalifikace",
]

COURSE_HISTORY_COLUMN_PATTERNS = [
    r"course",
    r"kurz",
    r"training",
    r"školení",
    r"learning",
    r"učení",
]


class SkodaDataAdapter:
    """Adapter for transforming Škoda CSV data."""
    
    def __init__(self):
        self.normalization_service = MultilingualNormalizationService()
        self.course_catalog: Dict[str, Dict[str, Any]] = {}
        self.skill_mapping: Dict[str, str] = {}
    
    def parse_skoda_csv(self, file_path: Path) -> pd.DataFrame:
        """Parse Škoda CSV with proper encoding."""
        try:
            df = pd.read_csv(file_path, encoding="utf-8-sig")
        except UnicodeDecodeError:
            try:
                df = pd.read_csv(file_path, encoding="latin-1")
            except Exception as e:
                logger.error(f"Failed to parse CSV {file_path}: {e}")
                raise ValueError(f"Cannot parse CSV file: {e}")
        
        return df
    
    def validate_skoda_schema(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Validate required Škoda columns exist."""
        missing = []
        for col in REQUIRED_SKODA_COLUMNS:
            if col not in df.columns:
                missing.append(col)
        
        return {
            "valid": len(missing) == 0,
            "missing_columns": missing,
            "total_columns": len(df.columns),
            "total_rows": len(df)
        }
    
    def transform_persstat_start_month_abc(self, value: str) -> Optional[datetime]:
        """Transform '2023-01' to datetime."""
        if pd.isna(value) or not value:
            return None
        
        value_str = str(value).strip()
        
        patterns = [
            (r"^(\d{4})-(\d{2})$", lambda m: datetime(int(m.group(1)), int(m.group(2)), 1)),
            (r"^(\d{4})/(\d{2})$", lambda m: datetime(int(m.group(1)), int(m.group(2)), 1)),
            (r"^(\d{2})\.(\d{4})$", lambda m: datetime(int(m.group(2)), int(m.group(1)), 1)),
        ]
        
        for pattern, converter in patterns:
            match = re.match(pattern, value_str)
            if match:
                try:
                    return converter(match)
                except ValueError:
                    continue
        
        return None
    
    def transform_org_hierarchy(self, row: pd.Series) -> Dict[str, str]:
        """Transform s1-s4 fields to structured hierarchy."""
        hierarchy = {}
        
        for level in range(1, 5):
            col_name = f"s{level}_org_hierarchy"
            if col_name in row.index:
                value = row.get(col_name)
                if pd.notna(value):
                    hierarchy[f"level_{level}"] = str(value).strip()
                else:
                    hierarchy[f"level_{level}"] = ""
            else:
                hierarchy[f"level_{level}"] = ""
        
        full_path = "/".join([hierarchy[f"level_{i}"] for i in range(1, 5) if hierarchy[f"level_{i}"]])
        hierarchy["full_path"] = full_path
        
        return hierarchy
    
    def extract_qualifications(self, row: pd.Series) -> List[Dict[str, Any]]:
        """Extract qualifications from row."""
        qualifications = []
        
        for col in row.index:
            col_lower = str(col).lower()
            if any(pattern in col_lower for pattern in QUALIFICATION_COLUMN_PATTERNS):
                value = row.get(col)
                if pd.notna(value) and str(value).strip():
                    qual_id = f"QUAL_{col}"
                    qual_name = str(value).strip()
                    
                    normalized = self.normalization_service.normalize_qualification_name(qual_name)
                    
                    qualifications.append({
                        "qualification_id": qual_id,
                        "qualification_name_cz": normalized["cz"] or qual_name,
                        "qualification_name_en": normalized["en"] or qual_name,
                        "mandatory": "mandatory" in col_lower or "povinn" in col_lower,
                        "obtained_date": None,
                        "expiry_date": None,
                        "status": "active"
                    })
        
        return qualifications
    
    def extract_course_history(self, row: pd.Series, employee_id: str) -> List[Dict[str, Any]]:
        """Extract course history from row."""
        courses = []
        
        for col in row.index:
            col_lower = str(col).lower()
            if any(pattern in col_lower for pattern in COURSE_HISTORY_COLUMN_PATTERNS):
                value = row.get(col)
                if pd.notna(value) and str(value).strip():
                    course_name = str(value).strip()
                    
                    course_id = f"COURSE_{col}_{employee_id}"
                    
                    skills_covered = []
                    if course_id in self.course_catalog:
                        skills_covered = self.course_catalog[course_id].get("skills_covered", [])
                    
                    courses.append({
                        "course_id": course_id,
                        "course_name": course_name,
                        "provider": "Škoda Academy" if "skoda" in col_lower or "škoda" in col_lower else "External",
                        "start_date": None,
                        "end_date": None,
                        "hours": None,
                        "completion_status": "completed",
                        "skills_covered": skills_covered,
                        "certificate_url": None
                    })
        
        return courses
    
    def derive_skills_from_courses(self, course_history: List[Dict[str, Any]]) -> List[str]:
        """Derive skills from completed courses."""
        skills = []
        
        for course in course_history:
            if course.get("completion_status") == "completed":
                course_id = course.get("course_id", "")
                
                if course_id in self.course_catalog:
                    catalog_entry = self.course_catalog[course_id]
                    skills.extend(catalog_entry.get("skills_covered", []))
                else:
                    skills_covered = course.get("skills_covered", [])
                    if skills_covered:
                        skills.extend(skills_covered)
        
        return list(set(skills))
    
    def normalize_skoda_skills(self, skills_raw: str) -> List[str]:
        """Normalize skills from Škoda format."""
        if pd.isna(skills_raw) or not skills_raw:
            return []
        
        skills_str = str(skills_raw).strip()
        
        if "," in skills_str:
            skills_list = [s.strip() for s in skills_str.split(",") if s.strip()]
        elif ";" in skills_str:
            skills_list = [s.strip() for s in skills_str.split(";") if s.strip()]
        elif "|" in skills_str:
            skills_list = [s.strip() for s in skills_str.split("|") if s.strip()]
        else:
            skills_list = [skills_str] if skills_str else []
        
        normalized_skills = []
        for skill in skills_list:
            normalized = self.normalization_service.normalize_skill_name(skill)
            if normalized:
                normalized_skills.append(normalized)
        
        return list(set(normalized_skills))
    
    def map_to_employee_record(self, row: pd.Series) -> Dict[str, Any]:
        """Map Škoda row to employee record."""
        personal_number = str(row.get("personal_number", "")).strip()
        if not personal_number:
            raise ValueError("personal_number is required")
        
        organization_branch = str(row.get("pers_organization_branch", "Unknown")).strip()
        
        start_date_str = row.get("persstat_start_month_abc")
        start_date = self.transform_persstat_start_month_abc(start_date_str) if pd.notna(start_date_str) else None
        
        org_hierarchy = self.transform_org_hierarchy(row)
        
        skills = []
        
        skills_column = None
        for col in row.index:
            if "skill" in str(col).lower() or "competenc" in str(col).lower():
                skills_column = col
                break
        
        if skills_column and skills_column in row.index:
            skills_raw = row.get(skills_column)
            skills = self.normalize_skoda_skills(skills_raw)
        
        course_history = self.extract_course_history(row, personal_number)
        derived_skills = self.derive_skills_from_courses(course_history)
        skills.extend(derived_skills)
        skills = list(set(skills))
        
        qualifications = self.extract_qualifications(row)
        
        metadata = {
            "persstat_start_month_abc": str(start_date_str) if pd.notna(start_date_str) else None,
            "pers_profession_id": str(row.get("pers_profession_id", "")).strip() if pd.notna(row.get("pers_profession_id")) else None,
            "pers_job_family_id": str(row.get("pers_job_family_id", "")).strip() if pd.notna(row.get("pers_job_family_id")) else None,
            "org_hierarchy": org_hierarchy,
            "start_date": start_date.isoformat() if start_date else None,
        }
        
        return {
            "employee_id": personal_number,
            "personal_number": personal_number,
            "department": organization_branch,
            "persstat_start_month_abc": str(start_date_str) if pd.notna(start_date_str) else None,
            "pers_organization_branch": organization_branch,
            "pers_profession_id": str(row.get("pers_profession_id", "")).strip() if pd.notna(row.get("pers_profession_id")) else None,
            "pers_job_family_id": str(row.get("pers_job_family_id", "")).strip() if pd.notna(row.get("pers_job_family_id")) else None,
            "s1_org_hierarchy": org_hierarchy.get("level_1", ""),
            "s2_org_hierarchy": org_hierarchy.get("level_2", ""),
            "s3_org_hierarchy": org_hierarchy.get("level_3", ""),
            "s4_org_hierarchy": org_hierarchy.get("level_4", ""),
            "skills": skills,
            "metadata": metadata,
            "qualifications": qualifications,
            "course_history": course_history,
        }
    
    def merge_historical_datasets(self, files: List[Path]) -> pd.DataFrame:
        """Merge 12 years of historical data."""
        dfs = []
        
        for file in files:
            try:
                df = self.parse_skoda_csv(file)
                
                year_match = re.search(r'(\d{4})', file.stem)
                if year_match:
                    snapshot_year = int(year_match.group(1))
                else:
                    snapshot_year = datetime.now().year
                
                df["snapshot_year"] = snapshot_year
                df["snapshot_date"] = datetime(snapshot_year, 1, 1)
                
                dfs.append(df)
            except Exception as e:
                logger.warning(f"Failed to load historical file {file}: {e}")
                continue
        
        if not dfs:
            raise ValueError("No valid historical datasets found")
        
        merged_df = pd.concat(dfs, ignore_index=True)
        return merged_df
    
    def load_historical_snapshots(self, df: pd.DataFrame) -> List[Dict[str, Any]]:
        """Load historical snapshots from merged dataframe."""
        snapshots = []
        
        for _, row in df.iterrows():
            try:
                employee_data = self.map_to_employee_record(row)
                snapshot_year = row.get("snapshot_year", datetime.now().year)
                snapshot_date = row.get("snapshot_date", datetime(snapshot_year, 1, 1))
                
                snapshot = {
                    "employee_id": employee_data["employee_id"],
                    "snapshot_date": snapshot_date if isinstance(snapshot_date, datetime) else datetime(snapshot_year, 1, 1),
                    "department": employee_data["department"],
                    "job_family_id": employee_data.get("pers_job_family_id"),
                    "org_hierarchy": {
                        "s1": employee_data.get("s1_org_hierarchy", ""),
                        "s2": employee_data.get("s2_org_hierarchy", ""),
                        "s3": employee_data.get("s3_org_hierarchy", ""),
                        "s4": employee_data.get("s4_org_hierarchy", ""),
                    },
                    "skills": employee_data.get("skills", []),
                    "qualifications": [q.get("qualification_id") for q in employee_data.get("qualifications", [])],
                    "pers_profession_id": employee_data.get("pers_profession_id"),
                    "pers_organization_branch": employee_data.get("pers_organization_branch"),
                }
                
                snapshots.append(snapshot)
            except Exception as e:
                logger.warning(f"Failed to create snapshot for row: {e}")
                continue
        
        return snapshots
    
    def set_course_catalog(self, catalog: Dict[str, Dict[str, Any]]):
        """Set course catalog for skill derivation."""
        self.course_catalog = catalog
    
    def set_skill_mapping(self, mapping: Dict[str, str]):
        """Set skill mapping for normalization."""
        self.skill_mapping = mapping

