import asyncio
from fastapi import Response
from ..errors.custom_exceptions import AccessDenied, SessionNotFound, InvalidSecretKey, SecpassNotFound

async def route_excepter(method, *args, **kwargs):
    try:
        res = method(*args, **kwargs)
        if asyncio.iscoroutinefunction(method):
            return await res
        return res
    except (SessionNotFound, AccessDenied):
        return Response(status_code=419)
    except (InvalidSecretKey, SecpassNotFound):
        return Response(status_code=400)
    except Exception:
        return Response(status_code=500)