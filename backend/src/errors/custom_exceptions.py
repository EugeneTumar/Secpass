class UserNotFound(Exception):
    def __init__(self, message="User not found", field=None):
        self.field = field
        super().__init__(message)

class SessionNotFound(Exception):
    def __init__(self, message="Session not found", field=None):
        self.field = field
        super().__init__(message)

class SecpassNotFound(Exception):
    def __init__(self, message="Secpass not found", field=None):
        self.field = field
        super().__init__(message)

class InvalidSecretKey(Exception):
    def __init__(self, message="Invalid secret key", field=None):
        self.field = field
        super().__init__(message)

class AccessDenied(Exception):
    def __init__(self, message="Access denied", field=None):
        self.field = field
        super().__init__(message)

class SimilarUserExist(Exception):
    def __init__(self, message="Name or login is alredy taken", field=None):
        self.field = field
        super().__init__(message)