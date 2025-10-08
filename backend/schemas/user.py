from pydantic import BaseModel, Field

class User_signin_schema(BaseModel):
    login: str = Field(max_length=32, min_length=4)
    password: str = Field(max_length=32, min_length=8)

class User_create_schema(User_signin_schema):
    name: str = Field(max_length=32, min_length=3)

class UserOpenSchema(BaseModel):
    id: int
    name: str = Field(max_length=32, min_length=3)
    login: str = Field(max_length=32, min_length=4)

class User_schema(BaseModel):
    name: str = Field(max_length=32, min_length=3)
    login: str = Field(max_length=32, min_length=4)
    password_hash: str

class Full_user_schema(User_schema):
    id: int
