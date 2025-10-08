from fastapi import APIRouter
from fastapi.responses import Response

from backend.errors.custom_exceptions import InvalidSecretKey, SecpassNotFound, SessionNotFound

from ..schemas.secpass import EncryptFormSchema, DecryptFormSchema
from ..services.secpass import add_secpass, del_secpass, get_secpass, get_secpass_list

secpass_router = APIRouter()

@secpass_router.post('/addsecpass')
async def add_secpass_endpoint(encrypt_info: EncryptFormSchema, session: str):
    await add_secpass(encrypt_info, session)

@secpass_router.post('/delsecpass')
async def delete_secpass_endpoint(id: int, session: str):
    await del_secpass(id, session)

@secpass_router.get('/getsecpasslist')
async def get_secpass_list_endpoint(session: str):
    res = await get_secpass_list(session)
    res2 = {'data': [i.model_dump() for i in res]}

    return res2

@secpass_router.get('/decryptsecpass')
async def encrypt_secpass_endpoint(secpass_id: int, secret_key: str, session: str) -> str:
    try:

        res = await get_secpass(DecryptFormSchema(secpass_id=secpass_id, secret_key=secret_key), session)
        return res
    except SessionNotFound as e:
        return Response(status_code=419)
    except InvalidSecretKey as e:
        return Response(status_code=400)
    except SecpassNotFound as e:
        return Response(status_code=400)
    except Exception as e:
        print(e.__dict__)
        return Response(status_code=500)