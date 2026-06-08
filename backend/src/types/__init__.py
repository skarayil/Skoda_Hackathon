"""
Schemas Module
--------------
Pydantic request/response models for API endpoints.
"""

from src.types.employee_schemas import (
    EmployeeRecordCreate,
    EmployeeRecordUpdate,
    EmployeeRecordPublic,
)
from src.types.skill_schemas import (
    SkillAnalysisCreate,
    SkillAnalysisPublic,
    SkillAnalysisRequest,
    SkillForecastingRequest,
    RoleFitRequest,
    ScenarioSimulationRequest,
    MentorRecommendationRequest,
)
from src.types.dataset_schemas import (
    DatasetRecordCreate,
    DatasetRecordPublic,
    IngestionResponse,
    DatasetSummary,
)
from src.types.learning_schemas import (
    LearningHistoryCreate,
    LearningHistoryUpdate,
    LearningHistoryPublic,
)
from src.types.audit_schemas import (
    AuditLogCreate,
    AuditLogPublic,
)
from src.types.ontology_schemas import (
    OntologyResponse,
)
from src.types.recommendations_schemas import (
    RecommendationsResponse,
    TrainingPathRequest,
    NextRoleRequest,
)
from src.types.dashboard_schemas import (
    DashboardOverviewResponse,
    SkillMapResponse,
    SkillHeatmapResponse,
    SkillTrendsResponse,
    InstantOverviewResponse,
)
from src.types.common_schemas import (
    UnifiedScoreModel,
    ErrorResponse,
)

__all__ = [
    # Employee schemas
    "EmployeeRecordCreate",
    "EmployeeRecordUpdate",
    "EmployeeRecordPublic",
    # Skill schemas
    "SkillAnalysisCreate",
    "SkillAnalysisPublic",
    "SkillAnalysisRequest",
    "SkillForecastingRequest",
    "RoleFitRequest",
    "ScenarioSimulationRequest",
    "MentorRecommendationRequest",
    # Dataset schemas
    "DatasetRecordCreate",
    "DatasetRecordPublic",
    "IngestionResponse",
    "DatasetSummary",
    # Learning schemas
    "LearningHistoryCreate",
    "LearningHistoryUpdate",
    "LearningHistoryPublic",
    # Audit schemas
    "AuditLogCreate",
    "AuditLogPublic",
    # Ontology schemas
    "OntologyResponse",
    # Recommendations schemas
    "RecommendationsResponse",
    "TrainingPathRequest",
    "NextRoleRequest",
    # Dashboard schemas
    "DashboardOverviewResponse",
    "SkillMapResponse",
    "SkillHeatmapResponse",
    "SkillTrendsResponse",
    "InstantOverviewResponse",
    # Common schemas
    "UnifiedScoreModel",
    "ErrorResponse",
]

