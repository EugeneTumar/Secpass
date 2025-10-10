from fastapi import APIRouter
from fastapi.responses import Response

from ..errors.custom_exceptions import AccessDenied, InvalidSecretKey, SecpassNotFound, SessionNotFound
from ..utils.route_excepter import route_excepter
from ..schemas.secpass import EncryptFormSchema, DecryptFormSchema
from ..services.secpass import add_secpass, del_secpass, get_secpass, get_secpass_list, update_secpass_label

secpass_router = APIRouter()

@secpass_router.post('/addsecpass')
async def add_secpass_endpoint(encrypt_info: EncryptFormSchema, session: str):
    return await route_excepter(add_secpass, encrypt_info, session)

@secpass_router.post('/delsecpass')
async def delete_secpass_endpoint(id: int, session: str):
    await route_excepter(del_secpass, id, session)

@secpass_router.get('/getsecpasslist')
async def get_secpass_list_endpoint(session: str):
    res = await route_excepter(get_secpass_list, session)
    response_fson = {'data': [i.model_dump() for i in res]}

    return response_fson

@secpass_router.get('/decryptsecpass')
async def encrypt_secpass_endpoint(secpass_id: int, secret_key: str, session: str) -> str:
    return await route_excepter(get_secpass, DecryptFormSchema(secpass_id=secpass_id, secret_key=secret_key), session)
    

@secpass_router.get('/updatesecpasslabel')
async def update_secpass_label_endpoint(secpass_id: int, label: str, session: str):
    return await route_excepter(update_secpass_label,secpass_id, label, session)