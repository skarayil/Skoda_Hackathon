"""
AI Succession Service
--------------------
AI-powered succession planning analysis.
"""

from typing import Any, Dict, List

from src.services.ai_orchestrator import AIOrchestrator
from src.types.ai_schemas import AISuccessionSummary
from src.middleware.logging_middleware import logger


class AISuccessionService:
    """AI service for succession analysis."""
    
    def __init__(self):
        self.orchestrator = AIOrchestrator()
    
    async def analyze_succession(
        self,
        department: str,
        candidates: List[Dict[str, Any]],
        pipeline_data: Dict[str, Any],
        language: str = None
    ) -> AISuccessionSummary:
        """Analyze leadership succession pipeline."""
        schema = {
            "pipeline_assessment": str,
            "top_candidates": list,
            "readiness_gaps": list,
            "vacancy_risk": int,
            "pipeline_strength": int,
            "development_priorities": list,
            "succession_timeline": str,
        }
        
        variables = {
            "department": department,
            "candidates": candidates,
            "pipeline_data": pipeline_data,
        }
        
        try:
            result = await self.orchestrator.run(
                prompt_name="succession_analysis",
                variables=variables,
                schema=schema,
                language=language
            )
            
            return AISuccessionSummary(**result)
        except Exception as exc:
            logger.error(f"AI succession analysis failed: {exc}", exc_info=True)
            return AISuccessionSummary(
                summary=f"Succession analysis unavailable: {str(exc)}",
                ai_mode="fallback"
            )

