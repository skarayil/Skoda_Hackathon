"""
Learning History Schemas
------------------------
Pydantic schemas for learning history records.
"""

from datetime import datetime
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, Field


class LearningHistoryCreate(BaseModel):
    """Schema for creating a learning history record."""
    
    employee_id: str = Field(..., description="Employee identifier")
    course_name: str = Field(..., description="Name of the course")
    provider: Optional[str] = Field(default=None, description="Course provider")
    start_date: Optional[datetime] = Field(default=None, description="Course start date")
    end_date: Optional[datetime] = Field(default=None, description="Course end date")
    hours: Optional[float] = Field(default=None, ge=0, description="Total hours spent")
    completion_status: str = Field(default="in_progress", description="Status: 'completed', 'in_progress', 'cancelled'")
    skills_covered: Optional[List[str]] = Field(default=None, description="List of skills covered")
    certificate_url: Optional[str] = Field(default=None, description="URL to certificate")


class LearningHistoryUpdate(BaseModel):
    """Schema for updating a learning history record."""
    
    course_name: Optional[str] = Field(default=None, description="Name of the course")
    provider: Optional[str] = Field(default=None, description="Course provider")
    start_date: Optional[datetime] = Field(default=None, description="Course start date")
    end_date: Optional[datetime] = Field(default=None, description="Course end date")
    hours: Optional[float] = Field(default=None, ge=0, description="Total hours spent")
    completion_status: Optional[str] = Field(default=None, description="Status: 'completed', 'in_progress', 'cancelled'")
    skills_covered: Optional[List[str]] = Field(default=None, description="List of skills covered")
    certificate_url: Optional[str] = Field(default=None, description="URL to certificate")


class LearningHistoryPublic(BaseModel):
    """Public schema for learning history records."""
    
    id: UUID
    employee_id: str
    course_name: str
    provider: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    hours: Optional[float] = None
    completion_status: str
    skills_covered: Optional[List[str]] = None
    certificate_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

