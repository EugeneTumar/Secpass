from fastapi import Request

from ..errors.custom_exceptions import AccessDenied, SecpassNotFound, InvalidSecretKey
from ..utils.crypto import encrypt, decrypt, get_key_checker, check_key
from ..schemas.secpass import DecryptFormSchema, DecryptSecpassSchema, EncryptFormSchema
from ..db.secpass import db_add_secpass, db_del_secpass_by_id, db_get_secpass_by_id, db_get_secpasses_by_user_id, db_update_secpass_label_by_id
from ..models.secpass import SecPassModel
from .auth import get_user_id_by_session



async def add_secpass(encrypt_info: EncryptFormSchema, session: str):
    try:
        encrypt_data = encrypt(encrypt_info.key, encrypt_info.data)
        key_ckecker = get_key_checker(encrypt_info.key)
        user_id = await get_user_id_by_session(session)
        await db_add_secpass(SecPassModel(label=encrypt_info.label, secpass=encrypt_data, key_checker=key_ckecker, user_id=user_id))

    except Exception as e:
        raise e
    
async def get_secpass(decrypt_info: DecryptFormSchema, session: str) -> str:
    user_id = await get_user_id_by_session(session)
    secpasses = await db_get_secpasses_by_user_id(user_id)

    filtered_secpasses=[secpass for secpass in secpasses if secpass.id == decrypt_info.secpass_id]
    
    if len(filtered_secpasses)==0:
        raise SecpassNotFound()
        
    res_secpass=filtered_secpasses[0]
    
    try:
        if not check_key(decrypt_info.secret_key, res_secpass.key_checker):
            raise InvalidSecretKey()
    except:
        raise InvalidSecretKey()
    
    res = decrypt(decrypt_info.secret_key, res_secpass.secpass)

    return res

async def get_secpass_list(session: str):
    try:
        user_id = await get_user_id_by_session(session)
        secpasses = await db_get_secpasses_by_user_id(user_id)
        return secpasses

    except Exception as e:
        raise e
    

async def del_secpass(secpass_id: int, session: str):
    try:
        user_id = await get_user_id_by_session(session)
        secpass = await db_get_secpass_by_id(secpass_id)
        if secpass is None:
            raise SecpassNotFound()
        if not secpass.user_id is user_id:
            raise AccessDenied()
        await db_del_secpass_by_id(secpass_id)
        
    except Exception as e:
        raise e
    

async def update_secpass_label(secpass_id: int, label: str, session: str):
    try:
        user_id = await get_user_id_by_session(session)
        secpass = await db_get_secpass_by_id(secpass_id)

        if secpass is None:
            raise SecpassNotFound()
        if not secpass.user_id is user_id:
            raise AccessDenied()
        
        await db_update_secpass_label_by_id(secpass_id, label)
        
    except Exception as e:
        raise e