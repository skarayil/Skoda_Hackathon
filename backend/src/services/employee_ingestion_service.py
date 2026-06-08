"""
Async Employee Ingestion Service
---------------------------------
Service layer for loading employees from datasets into the database.
Uses async repositories for all DB operations.
Supports Škoda dataset format.
"""

from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional

import anyio
from sqlalchemy.ext.asyncio import AsyncSession

from src.models.skill_models import EmployeeRecord
from src.models.skoda_models import (
    QualificationRecord,
    OrgHierarchyRecord,
    HistoricalEmployeeSnapshot
)
from src.services.employee_repository import EmployeeRepository
from src.services.ingestion_service import (
    load_employees_from_dataset as load_employees_from_dataset_sync,
    paths,
    detect_skoda_schema
)
from src.services.skoda_data_adapter import SkodaDataAdapter
from src.services.historical_data_loader import HistoricalDataLoader
from src.middleware.logging_middleware import logger


class EmployeeIngestionService:
    """Async service for ingesting employees from datasets."""
    
    def __init__(self, employee_repo: EmployeeRepository):
        """
        Initialize service with employee repository.
        
        Args:
            employee_repo: Employee repository instance
        """
        self.employee_repo = employee_repo
        self.skoda_adapter = SkodaDataAdapter()
        self.historical_loader = HistoricalDataLoader()
    
    async def load_employees_from_dataset(
        self,
        session: AsyncSession,
        dataset_id: str,
        employee_id_column: str = "employee_id",
        department_column: str = "department",
        skills_column: Optional[str] = None,
        update_existing: bool = True,
        use_skoda_adapter: Optional[bool] = None
    ) -> Dict[str, int]:
        """
        Load employee records from an ingested dataset into the database.
        
        Args:
            session: Async database session
            dataset_id: Dataset ID (filename without extension)
            employee_id_column: Column name for employee ID (ignored if Škoda format)
            department_column: Column name for department (ignored if Škoda format)
            skills_column: Optional column name for skills (ignored if Škoda format)
            update_existing: If True, update existing employee records; if False, skip them
            use_skoda_adapter: Force use of Škoda adapter (None = auto-detect)
        """
        # Find dataset file
        dataset_path = paths.normalized_dir / f"{dataset_id}.csv"
        if not dataset_path.exists():
            datasets = list(paths.normalized_dir.glob(f"{dataset_id}.*"))
            if datasets:
                dataset_path = datasets[0]
            else:
                raise ValueError(f"Dataset not found: {dataset_id}")
        
        # Detect Škoda format
        import pandas as pd
        df = pd.read_csv(dataset_path, encoding="utf-8-sig", nrows=1)
        is_skoda = use_skoda_adapter if use_skoda_adapter is not None else detect_skoda_schema(df)
        
        # Load employees from dataset
        employees = await anyio.to_thread.run_sync(
            load_employees_from_dataset_sync,
            dataset_path,
            employee_id_column,
            department_column,
            skills_column,
            is_skoda,
        )
        
        if not employees:
            raise ValueError("No employees found in dataset")
        
        # Load into database using async repository
        created_count = 0
        updated_count = 0
        skipped_count = 0
        
        for emp_data in employees:
            employee_id = emp_data.get("employee_id") or emp_data.get("personal_number")
            if not employee_id:
                continue
            
            # Check if employee exists
            existing = await self.employee_repo.get_by_employee_id(session, employee_id)
            
            if existing:
                if update_existing:
                    # Update existing record with Škoda fields
                    existing.department = emp_data.get("department", existing.department)
                    existing.skills = emp_data.get("skills", existing.skills)
                    existing.metadata = emp_data.get("metadata", existing.metadata)
                    
                    if is_skoda:
                        existing.personal_number = emp_data.get("personal_number")
                        existing.persstat_start_month_abc = emp_data.get("persstat_start_month_abc")
                        existing.pers_organization_branch = emp_data.get("pers_organization_branch")
                        existing.pers_profession_id = emp_data.get("pers_profession_id")
                        existing.pers_job_family_id = emp_data.get("pers_job_family_id")
                        existing.s1_org_hierarchy = emp_data.get("s1_org_hierarchy")
                        existing.s2_org_hierarchy = emp_data.get("s2_org_hierarchy")
                        existing.s3_org_hierarchy = emp_data.get("s3_org_hierarchy")
                        existing.s4_org_hierarchy = emp_data.get("s4_org_hierarchy")
                    
                    existing.updated_at = datetime.now(timezone.utc)
                    await self.employee_repo.update(session, existing)
                    updated_count += 1
                else:
                    skipped_count += 1
            else:
                # Create new record
                employee_record = EmployeeRecord(
                    employee_id=employee_id,
                    department=emp_data.get("department", "Unknown"),
                    skills=emp_data.get("skills"),
                    metadata=emp_data.get("metadata", {}),
                )
                
                if is_skoda:
                    employee_record.personal_number = emp_data.get("personal_number")
                    employee_record.persstat_start_month_abc = emp_data.get("persstat_start_month_abc")
                    employee_record.pers_organization_branch = emp_data.get("pers_organization_branch")
                    employee_record.pers_profession_id = emp_data.get("pers_profession_id")
                    employee_record.pers_job_family_id = emp_data.get("pers_job_family_id")
                    employee_record.s1_org_hierarchy = emp_data.get("s1_org_hierarchy")
                    employee_record.s2_org_hierarchy = emp_data.get("s2_org_hierarchy")
                    employee_record.s3_org_hierarchy = emp_data.get("s3_org_hierarchy")
                    employee_record.s4_org_hierarchy = emp_data.get("s4_org_hierarchy")
                
                await self.employee_repo.create(session, employee_record)
                created_count += 1
            
            # Save qualifications if Škoda format
            if is_skoda and emp_data.get("qualifications"):
                await self._save_qualifications(session, employee_id, emp_data.get("qualifications", []))
            
            # Save org hierarchy if Škoda format
            if is_skoda and emp_data.get("metadata", {}).get("org_hierarchy"):
                await self._save_org_hierarchy(session, employee_id, emp_data.get("metadata", {}).get("org_hierarchy", {}))
        
        await session.commit()
        
        return {
            "total_loaded": len(employees),
            "created": created_count,
            "updated": updated_count,
            "skipped": skipped_count,
        }
    
    async def _save_qualifications(
        self,
        session: AsyncSession,
        employee_id: str,
        qualifications: List[Dict[str, Any]]
    ):
        """Save qualification records."""
        for qual_data in qualifications:
            try:
                qual_record = QualificationRecord(
                    employee_id=employee_id,
                    qualification_id=qual_data.get("qualification_id", ""),
                    qualification_name_cz=qual_data.get("qualification_name_cz", ""),
                    qualification_name_en=qual_data.get("qualification_name_en", ""),
                    mandatory=qual_data.get("mandatory", False),
                    obtained_date=qual_data.get("obtained_date"),
                    expiry_date=qual_data.get("expiry_date"),
                    status=qual_data.get("status", "active"),
                )
                session.add(qual_record)
            except Exception as e:
                logger.warning(f"Failed to save qualification: {e}")
                continue
    
    async def _save_org_hierarchy(
        self,
        session: AsyncSession,
        employee_id: str,
        org_hierarchy: Dict[str, str]
    ):
        """Save org hierarchy records."""
        for level in range(1, 5):
            level_key = f"level_{level}"
            hierarchy_name = org_hierarchy.get(level_key, "")
            
            if hierarchy_name:
                try:
                    hierarchy_record = OrgHierarchyRecord(
                        employee_id=employee_id,
                        level=level,
                        hierarchy_path=org_hierarchy.get("full_path", ""),
                        hierarchy_name_cz=hierarchy_name,
                        hierarchy_name_en=hierarchy_name,
                    )
                    session.add(hierarchy_record)
                except Exception as e:
                    logger.warning(f"Failed to save org hierarchy level {level}: {e}")
                    continue
    
    async def load_historical_data(
        self,
        session: AsyncSession,
        base_path: Path,
        years: List[int]
    ) -> Dict[str, int]:
        """Load 12 years of historical data."""
        snapshots = await self.historical_loader.load_historical_data(base_path, years)
        saved_count = await self.historical_loader.save_historical_snapshots(session, snapshots)
        
        return {
            "total_snapshots": len(snapshots),
            "saved": saved_count,
            "failed": len(snapshots) - saved_count
        }
