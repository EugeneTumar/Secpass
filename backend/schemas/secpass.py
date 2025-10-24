from pydantic import BaseModel, Field

class DecryptFormSchema(BaseModel):
    secpass_id: int
    secret_key: str

class EncryptFormSchema(BaseModel):
    data: str
    label: str
    key: str

class SecpassShortSchema(BaseModel):
    id: int
    label: str
    
class SecpassModelSchema(SecpassShortSchema):
    key_checker: str
    secpass: str
    user_id: int
    
class SecpassFullSchema(SecpassModelSchema):
    key: int

class DecryptSecpassSchema(SecpassShortSchema):
    data: str

 
class UpdateSecpassLabelSchema(BaseModel):
    secpass_id: int
    label: str = Field(min_length=1, pattern='^\s*\S+\s*$')