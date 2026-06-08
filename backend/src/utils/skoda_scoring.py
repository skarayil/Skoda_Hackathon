"""
Škoda Scoring Engine
--------------------
Scoring with qualification, role-family similarity, learning effort, skill freshness, org hierarchy weighting.
"""

import math
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional

from src.types.common_schemas import UnifiedScoreModel
from src.middleware.logging_middleware import logger


def _clamp(value: float) -> int:
    return max(0, min(100, int(round(value))))


def calculate_qualification_score(
    employee_qualifications: List[Dict[str, Any]],
    required_qualifications: List[str]
) -> int:
    """Calculate qualification score (0-100)."""
    if not required_qualifications:
        return 100
    
    if not employee_qualifications:
        return 0
    
    employee_qual_ids = {q.get("qualification_id") for q in employee_qualifications if q.get("status") == "active"}
    required_set = set(required_qualifications)
    
    matched = len(employee_qual_ids & required_set)
    score = int((matched / len(required_set)) * 100) if required_set else 100
    
    return _clamp(score)


def calculate_role_family_similarity(
    employee_job_family_id: Optional[str],
    target_job_family_id: Optional[str]
) -> int:
    """Calculate role-family similarity score (0-100)."""
    if not target_job_family_id:
        return 70
    
    if not employee_job_family_id:
        return 30
    
    if employee_job_family_id == target_job_family_id:
        return 100
    
    employee_prefix = employee_job_family_id.split("_")[0] if "_" in employee_job_family_id else employee_job_family_id
    target_prefix = target_job_family_id.split("_")[0] if "_" in target_job_family_id else target_job_family_id
    
    if employee_prefix == target_prefix:
        return 75
    
    return 40


def calculate_learning_effort_score(
    course_history: List[Dict[str, Any]],
    historical_snapshots: List[Dict[str, Any]],
    years_back: int = 12
) -> int:
    """Calculate learning effort score based on 12 years of history."""
    if not course_history and not historical_snapshots:
        return 30
    
    cutoff_date = datetime.now() - timedelta(days=years_back * 365)
    
    completed_courses = [
        c for c in course_history
        if c.get("completion_status") == "completed"
    ]
    
    total_hours = sum(c.get("hours", 0) for c in completed_courses if c.get("hours"))
    
    if historical_snapshots:
        skill_growth = _calculate_skill_growth(historical_snapshots, cutoff_date)
    else:
        skill_growth = 0
    
    hours_score = min(100, int(total_hours / 10))
    growth_score = min(100, skill_growth * 10)
    
    score = (hours_score * 0.6) + (growth_score * 0.4)
    
    return _clamp(score)


def _calculate_skill_growth(historical_snapshots: List[Dict[str, Any]], cutoff_date: datetime) -> float:
    """Calculate skill growth over time."""
    if len(historical_snapshots) < 2:
        return 0.0
    
    sorted_snapshots = sorted(
        historical_snapshots,
        key=lambda s: s.get("snapshot_date", datetime.min) if isinstance(s.get("snapshot_date"), datetime) else datetime.min
    )
    
    filtered_snapshots = [
        s for s in sorted_snapshots
        if isinstance(s.get("snapshot_date"), datetime) and s.get("snapshot_date") >= cutoff_date
    ]
    
    if len(filtered_snapshots) < 2:
        return 0.0
    
    first_skills = len(filtered_snapshots[0].get("skills", []))
    last_skills = len(filtered_snapshots[-1].get("skills", []))
    
    if first_skills == 0:
        return 1.0 if last_skills > 0 else 0.0
    
    growth = (last_skills - first_skills) / first_skills
    return max(0.0, min(1.0, growth))


def calculate_skill_freshness_score(
    skills: List[str],
    course_history: List[Dict[str, Any]]
) -> int:
    """Calculate skill freshness score (decay over time)."""
    if not skills:
        return 0
    
    if not course_history:
        return 50
    
    skill_freshness_scores = []
    
    for skill in skills:
        skill_lower = skill.lower()
        
        relevant_courses = [
            c for c in course_history
            if c.get("completion_status") == "completed" and
            skill_lower in [s.lower() for s in c.get("skills_covered", [])]
        ]
        
        if not relevant_courses:
            skill_freshness_scores.append(30)
            continue
        
        most_recent = max(
            relevant_courses,
            key=lambda c: c.get("end_date", datetime.min) if isinstance(c.get("end_date"), datetime) else datetime.min
        )
        
        end_date = most_recent.get("end_date")
        if not isinstance(end_date, datetime):
            skill_freshness_scores.append(30)
            continue
        
        days_since = (datetime.now() - end_date).days
        
        if days_since < 90:
            freshness = 1.0
        elif days_since > 730:
            freshness = 0.0
        else:
            freshness = math.exp(-(days_since - 90) / 365)
        
        skill_freshness_scores.append(freshness * 100)
    
    avg_freshness = sum(skill_freshness_scores) / len(skill_freshness_scores) if skill_freshness_scores else 30
    
    return _clamp(avg_freshness)


def calculate_org_hierarchy_weight(
    org_hierarchy: Dict[str, str]
) -> int:
    """Calculate org hierarchy importance weight (0-100)."""
    if not org_hierarchy:
        return 50
    
    levels_filled = sum(1 for i in range(1, 5) if org_hierarchy.get(f"level_{i}"))
    
    if levels_filled == 4:
        return 100
    elif levels_filled == 3:
        return 80
    elif levels_filled == 2:
        return 60
    elif levels_filled == 1:
        return 40
    else:
        return 20


def calculate_career_progression_score(
    historical_snapshots: List[Dict[str, Any]]
) -> int:
    """Calculate career progression score from historical data."""
    if len(historical_snapshots) < 2:
        return 50
    
    sorted_snapshots = sorted(
        historical_snapshots,
        key=lambda s: s.get("snapshot_date", datetime.min) if isinstance(s.get("snapshot_date"), datetime) else datetime.min
    )
    
    promotions = 0
    job_changes = 0
    
    for i in range(1, len(sorted_snapshots)):
        prev = sorted_snapshots[i - 1]
        curr = sorted_snapshots[i]
        
        prev_job_family = prev.get("job_family_id")
        curr_job_family = curr.get("job_family_id")
        
        if prev_job_family != curr_job_family:
            job_changes += 1
            
            prev_skills = len(prev.get("skills", []))
            curr_skills = len(curr.get("skills", []))
            
            if curr_skills > prev_skills:
                promotions += 1
    
    if len(sorted_snapshots) < 2:
        progression_score = 50
    else:
        change_rate = job_changes / (len(sorted_snapshots) - 1)
        promotion_rate = promotions / max(1, job_changes)
        
        progression_score = (change_rate * 30) + (promotion_rate * 70)
    
    return _clamp(progression_score)


def compose_skoda_unified_score(
    employee: Dict[str, Any],
    role_requirements: Dict[str, Any],
    historical_snapshots: List[Dict[str, Any]],
    base_unified_score: Optional[UnifiedScoreModel] = None
) -> UnifiedScoreModel:
    """Compose unified score with Škoda-specific fields."""
    employee_qualifications = employee.get("qualifications", [])
    required_qualifications = role_requirements.get("mandatory_qualifications", [])
    qualification_score = calculate_qualification_score(employee_qualifications, required_qualifications)
    
    employee_job_family_id = employee.get("pers_job_family_id")
    target_job_family_id = role_requirements.get("job_family_id")
    role_family_score = calculate_role_family_similarity(employee_job_family_id, target_job_family_id)
    
    course_history = employee.get("course_history", [])
    learning_effort_score = calculate_learning_effort_score(course_history, historical_snapshots)
    
    skills = employee.get("skills", [])
    skill_freshness_score = calculate_skill_freshness_score(skills, course_history)
    
    org_hierarchy = employee.get("metadata", {}).get("org_hierarchy", {})
    org_hierarchy_weight = calculate_org_hierarchy_weight(org_hierarchy)
    
    career_progression_score = calculate_career_progression_score(historical_snapshots)
    
    if base_unified_score:
        base_overall = base_unified_score.overall_score
        base_role_fit = base_unified_score.role_fit_score
        base_readiness = base_unified_score.next_role_readiness
        base_risk = base_unified_score.risk_score
    else:
        base_overall = 70
        base_role_fit = 70
        base_readiness = 70
        base_risk = 30
    
    overall = _clamp(
        (qualification_score * 0.2) +
        (role_family_score * 0.15) +
        (learning_effort_score * 0.15) +
        (skill_freshness_score * 0.2) +
        (org_hierarchy_weight * 0.1) +
        (career_progression_score * 0.2)
    )
    
    role_fit_adjusted = _clamp((base_role_fit * 0.7) + (role_family_score * 0.3))
    readiness_adjusted = _clamp((base_readiness * 0.6) + (learning_effort_score * 0.4))
    
    return UnifiedScoreModel(
        overall_score=overall,
        skill_scores=base_unified_score.skill_scores if base_unified_score else {},
        gap_scores={
            **(base_unified_score.gap_scores if base_unified_score else {}),
            "qualification_gap": _clamp(100 - qualification_score),
            "skill_freshness_gap": _clamp(100 - skill_freshness_score)
        },
        role_fit_score=role_fit_adjusted,
        next_role_readiness=readiness_adjusted,
        risk_score=base_risk,
        ai_gap_score=base_unified_score.ai_gap_score if base_unified_score else None,
        ai_readiness=base_unified_score.ai_readiness if base_unified_score else None,
        ai_risk_signal=base_unified_score.ai_risk_signal if base_unified_score else None,
        ai_skill_recommendations_count=base_unified_score.ai_skill_recommendations_count if base_unified_score else None,
        ai_mode=base_unified_score.ai_mode if base_unified_score else None
    )

