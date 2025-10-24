export function nameValidationHint(login){
    let res = {result: true, hint:''};
    ///6-20 leters, digit or '.', '-', '_'
    var pattern=/^[a-zA-Z0-9_.-]{6,20}$/
    
    if(!pattern.test(login)){
        res.hint = "Имя должено состоять из 6-20 букв, цифр или символов  '.', '-', '_'"
        res.result=false;
    }

    return res;
}

export function labelValidationHint(login){
    let res = {result: true, hint:''};
    ///6-20 leters, digit or '.', '-', '_'
    var pattern=/^[a-zA-Z0-9_.-]{3,20}$/
    
    if(!pattern.test(login)){
        res.hint = "Имя должено состоять из 3-20 букв, цифр или символов  '.', '-', '_'"
        res.result=false;
    }

    return res;
}

export function loginValidationHint(login){
    let res = {result: true, hint:''};
    ///6-20 leters, digit or '.', '-', '_'
    var pattern=/^[a-zA-Z0-9_.-]{6,20}$/
    
    if(!pattern.test(login)){
        res.hint = "Логин должен состоять из 6-20 букв, цифр или символов  '.', '-', '_'"
        res.result=false;
    }

    return res;
}

export function passwordValidationHint(password){
    let res = {result: true, hint:''};
    ///8-16 lowercase leters, uppercase letters and digits, where must be all types
    let pattern=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if(!pattern.test(password)){
        res.hint = "Пароль должен состоять минимум из 8 символов, содержать хотя бы одну цифру, заглавную и прописную букву";
        res.result=false;
    }

    return res;
}
