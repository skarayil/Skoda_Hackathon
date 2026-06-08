"""
Azure OpenAI LLM Client
-----------------------
Secure Azure OpenAI integration with health checks and fail-fast configuration.
"""

import json
import time
from typing import Any, Dict, Optional

from openai import AsyncOpenAI

from src.config.settings import app_settings
from src.services.tone_service import get_tone_service
from src.middleware.logging_middleware import logger


class AzureLLMClient:
    """Azure OpenAI client with secure context guarantee."""
    
    def __init__(self, endpoint: str, api_key: str, model: str, api_version: str, deployment_name: str):
        """
        Initialize Azure OpenAI client.
        
        Args:
            endpoint: Azure OpenAI endpoint URL
            api_key: Azure OpenAI API key
            model: Model name
            api_version: API version
            deployment_name: Deployment name
        """
        if not endpoint or not api_key:
            raise ValueError("Azure OpenAI endpoint and API key must be configured")
        
        self.endpoint = endpoint.rstrip("/")
        self.api_key = api_key
        self.model = model
        self.api_version = api_version
        self.deployment_name = deployment_name
        self.tone_service = get_tone_service()
        self._client: Optional[AsyncOpenAI] = None
        self._health_checked = False
    
    async def __aenter__(self) -> "AzureLLMClient":
        await self._ensure_health_check()
        return self
    
    async def __aexit__(self, exc_type, exc, tb) -> None:
        if self._client:
            await self._client.close()
            self._client = None
    
    async def _ensure_health_check(self) -> None:
        """Ensure health check is performed."""
        if not self._health_checked:
            await self._health_check()
            self._health_checked = True
    
    async def _health_check(self) -> bool:
        """Health check for Azure OpenAI."""
        try:
            client = await self._get_client()
            
            test_response = await client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": "Say 'OK' if you can read this."}
                ],
                max_tokens=10,
                temperature=0.0
            )
            
            if test_response.choices and test_response.choices[0].message.content:
                logger.info("[Azure] Health check passed")
                return True
            else:
                raise RuntimeError("Azure OpenAI health check failed: Empty response")
        except Exception as e:
            logger.error(f"[Azure] Health check failed: {e}")
            raise RuntimeError(f"Azure OpenAI health check failed: {e}")
    
    async def _get_client(self) -> AsyncOpenAI:
        """Get or create Azure OpenAI client."""
        if not self._client:
            base_url = f"{self.endpoint}/openai/deployments/{self.deployment_name}"
            
            self._client = AsyncOpenAI(
                api_key=self.api_key,
                base_url=base_url,
                default_headers={"api-key": self.api_key},
                default_query={"api-version": self.api_version}
            )
        
        return self._client
    
    async def call_llm(
        self,
        prompt: str,
        schema: Dict[str, Any],
        system_message: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: int = 2000,
    ) -> Dict[str, Any]:
        """
        Call Azure OpenAI with secure context.
        
        All data stays within Azure OpenAI - no external APIs.
        """
        await self._ensure_health_check()
        
        apply_prompt = prompt
        if schema:
            apply_prompt = self.tone_service.build_tone_prompt(prompt, schema)
        
        base_system = system_message or "You are a helpful AI assistant."
        if self.tone_service.use_tone:
            base_system += " Respond using TONE format (Token-Optimized Notation Engine) to save tokens."
        else:
            base_system += " Always respond with valid JSON only."
        
        client = await self._get_client()
        response_format = None if self.tone_service.use_tone else {"type": "json_object"}
        
        start = time.perf_counter()
        try:
            response = await client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": base_system},
                    {"role": "user", "content": apply_prompt},
                ],
                response_format=response_format,
                temperature=temperature,
                max_tokens=max_tokens,
            )
        except Exception as exc:
            logger.error(f"[Azure] LLM call failed: {exc}")
            raise
        
        elapsed_ms = int((time.perf_counter() - start) * 1000)
        usage = getattr(response, "usage", None)
        prompt_tokens = getattr(usage, "prompt_tokens", None) if usage else None
        completion_tokens = getattr(usage, "completion_tokens", None) if usage else None
        
        logger.info("[Azure] Provider=azure Model=%s", self.model)
        logger.info("[Azure] Request tokens=%s", prompt_tokens if prompt_tokens is not None else "unknown")
        logger.info("[Azure] Response tokens=%s", completion_tokens if completion_tokens is not None else "unknown")
        logger.info("[Azure] Elapsed_ms=%s", elapsed_ms)
        logger.info("[Azure] Status=success")
        
        content = response.choices[0].message.content
        if not content:
            raise ValueError("Empty response from Azure OpenAI")
        
        return self.tone_service.parse_llm_response(content, schema)
    
    async def analyze_skills(
        self,
        employee_data: Dict[str, Any],
        role_requirements: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Analyze employee skills via Azure OpenAI."""
        schema = {
            "current_skills": list,
            "missing_skills": list,
            "gap_score": int,
            "ai_gap_score": int,
            "ai_readiness": int,
            "ai_risk_signal": int,
            "ai_skill_recommendations_count": int,
            "strengths": list,
            "recommended_roles": list,
            "development_path": list,
            "analysis_summary": str,
        }
        
        employee_id = employee_data.get("employee_id", "Unknown")
        department = employee_data.get("department", "Unknown")
        current_skills = employee_data.get("skills", [])
        
        prompt = f"""Analyze the following employee's skills and provide a comprehensive assessment.

Employee ID: {employee_id}
Department: {department}
Current Skills: {', '.join(current_skills) if current_skills else 'None listed'}
"""
        
        if role_requirements:
            required_skills = role_requirements.get("required_skills", [])
            preferred_skills = role_requirements.get("preferred_skills", [])
            prompt += f"""
Target Role Requirements:
- Required Skills: {', '.join(required_skills) if required_skills else 'None'}
- Preferred Skills: {', '.join(preferred_skills) if preferred_skills else 'None'}
"""
        
        system_message = "You are an expert HR and career development analyst."
        
        result = await self.call_llm(
            prompt=prompt,
            schema=schema,
            system_message=system_message,
            temperature=0.7,
            max_tokens=2000,
        )
        
        ai_gap = int(result.get("ai_gap_score", result.get("gap_score", 65)))
        ai_readiness = int(result.get("ai_readiness", ai_gap))
        ai_risk = int(result.get("ai_risk_signal", max(0, 100 - ai_readiness)))
        ai_skill_recs = int(
            result.get(
                "ai_skill_recommendations_count",
                len(result.get("missing_skills", [])),
            )
        )
        
        return {
            "current_skills": result.get("current_skills", []),
            "missing_skills": result.get("missing_skills", []),
            "gap_score": int(result.get("gap_score", ai_gap)),
            "ai_gap_score": ai_gap,
            "ai_readiness": ai_readiness,
            "ai_risk_signal": ai_risk,
            "ai_skill_recommendations_count": ai_skill_recs,
            "strengths": result.get("strengths", []),
            "recommended_roles": result.get("recommended_roles", []),
            "development_path": result.get("development_path", []),
            "analysis_summary": result.get("analysis_summary", "Analysis completed."),
        }

