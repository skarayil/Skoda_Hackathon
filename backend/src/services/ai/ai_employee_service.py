"""
AI Employee Service
-------------------
AI-powered employee analysis and summarization.
"""

from typing import Any, Dict, List, Optional

from src.services.ai_orchestrator import AIOrchestrator
from src.types.ai_schemas import AIEmployeeSummary
from src.middleware.logging_middleware import logger


class AIEmployeeService:
    """AI service for employee analysis."""
    
    def __init__(self):
        self.orchestrator = AIOrchestrator()
    
    async def generate_summary(
        self,
        employee_data: Dict[str, Any],
        skills: List[str],
        history: Optional[List[Dict[str, Any]]] = None,
        qualifications: Optional[List[Dict[str, Any]]] = None,
        language: str = None
    ) -> AIEmployeeSummary:
        """Generate executive employee summary."""
        schema = {
            "summary": str,
            "strengths": list,
            "development_areas": list,
            "readiness_score": int,
            "next_role_readiness": str,
            "recommended_actions": list,
            "risk_signals": list,
            "career_trajectory": str,
        }
        
        variables = {
            "employee_data": employee_data,
            "skills": skills,
            "history": history or [],
            "qualifications": qualifications or [],
        }
        
        try:
            result = await self.orchestrator.run(
                prompt_name="employee_summary",
                variables=variables,
                schema=schema,
                language=language
            )
            
            return AIEmployeeSummary(**result)
        except Exception as exc:
            logger.error(f"AI employee summary failed: {exc}", exc_info=True)
            return AIEmployeeSummary(
                summary=f"Employee analysis unavailable: {str(exc)}",
                ai_mode="fallback"
            )

