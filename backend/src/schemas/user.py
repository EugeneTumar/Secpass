from pydantic import BaseModel, Field
from typing import Annotated

class UserSigninSchema(BaseModel):
    login: str = Field(max_length=32, min_length=4)
    password: str = Field(max_length=32, min_length=8)

class UserCreateSchema(UserSigninSchema):
    name: str = Field(max_length=32, min_length=3)

class UserOpenSchema(BaseModel):
    id: int
    name: str = Field(max_length=32, min_length=3)
    login: str = Field(max_length=32, min_length=4)

class UserSchema(BaseModel):
    name: str = Field(max_length=32, min_length=3)
    login: str = Field(max_length=32, min_length=4)
    password_hash: str

class FullUserSchema(UserSchema):
    id: int

class UpdateUserSchema(BaseModel):
    name: str | None = Field(max_length=32, min_length=3, default=None)
    login: str | None = Field(max_length=32, min_length=4, default=None)
    password: str | None = Field(max_length=32, min_length=8)

