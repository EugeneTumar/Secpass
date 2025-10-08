import base64
import uuid
import hashlib
from cryptography.fernet import Fernet

def create_session_key() -> str:
    return str(uuid.uuid4())

def hash_func(data: str) -> str:
    
    password = data.encode()
    salt = 'h34j3tv45kg'.encode()
    dk = hashlib.pbkdf2_hmac('sha256', password, salt, 100000)
    
    res = dk.hex()

    return res

def encrypt(key: str, data: str) -> str:
    f = Fernet(get_fernet_key_from_password_string(key))
    res = f.encrypt(data.encode('utf-8'))
    return res.decode("utf-8")


def decrypt(key: str, data: str) -> str:
    f = Fernet(get_fernet_key_from_password_string(key))
    res = f.decrypt(data.encode('utf-8'))
    return res.decode("utf-8")

def get_fernet_key_from_password_string(password: str) -> bytes:
    key = password
    hashed_key = hashlib.sha256(key.encode('utf-8'))
    hashed_key_digest = hashed_key.digest()
    base64_key = base64.b64encode(hashed_key_digest)
    return base64_key

def check_key(key, key_checker) -> bool:
    return decrypt(key, key_checker) == key

def get_key_checker(key) -> str:
    return encrypt(key, key)