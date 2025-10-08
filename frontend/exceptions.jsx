export class WrongPasswordError extends Error {
  constructor(message, errorCode) {
    super(message); 
    this.name = "WrongPasswordError";
    this.errorCode = errorCode; 
  }
}

export class ServerError extends Error {
  constructor(message, errorCode) {
    super(message); 
    this.name = "ServerError";
    this.errorCode = errorCode; 
  }
}