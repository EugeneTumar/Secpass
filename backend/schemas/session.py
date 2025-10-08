from pydantic import BaseModel, Field

class SessionKey_schema(BaseModel):
    session_key: str = Field(max_length=100, min_length=1)

class Session_schema(SessionKey_schema):
    user_id: int = Field(ge=0)
