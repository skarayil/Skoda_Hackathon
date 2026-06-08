"""
AI Compare Service
-----------------
AI-powered department comparison.
"""

from typing import Any, Dict

from src.services.ai_orchestrator import AIOrchestrator
from src.types.ai_schemas import AIDepartmentComparison
from src.middleware.logging_middleware import logger


class AICompareService:
    """AI service for department comparison."""
    
    def __init__(self):
        self.orchestrator = AIOrchestrator()
    
    async def compare_departments(
        self,
        department1_data: Dict[str, Any],
        department2_data: Dict[str, Any],
        metrics: Dict[str, Any],
        language: str = None
    ) -> AIDepartmentComparison:
        """Compare two departments and provide insights."""
        schema = {
            "comparison_summary": str,
            "department1_strengths": list,
            "department2_strengths": list,
            "skill_overlap": list,
            "talent_transfer_opportunities": list,
            "risk_comparison": dict,
            "recommendations": list,
            "relative_performance": dict,
        }
        
        variables = {
            "department1_data": department1_data,
            "department2_data": department2_data,
            "metrics": metrics,
        }
        
        try:
            result = await self.orchestrator.run(
                prompt_name="department_compare",
                variables=variables,
                schema=schema,
                language=language
            )
            
            return AIDepartmentComparison(**result)
        except Exception as exc:
            logger.error(f"AI department comparison failed: {exc}", exc_info=True)
            return AIDepartmentComparison(
                comparison_summary=f"Department comparison unavailable: {str(exc)}",
                ai_mode="fallback"
            )

