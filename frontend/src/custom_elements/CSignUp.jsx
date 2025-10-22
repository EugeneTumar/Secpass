import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { Box, Callout, TextField } from "@radix-ui/themes";

import { loginValidationHint, nameValidationHint, passwordValidationHint } from '../../scripts/validate'
import { SignUpFetch } from '../../scripts/auth'
import styles from '../styles';
import axios from 'axios';

function CSignUp() {
    const navigate = useNavigate();
    
    const [nameHint, SetNameHint] = useState('');
    const [loginHint, SetLoginHint] = useState('');
    const [passwordHint, SetPasswordHint] = useState('');

    const nameInputRef = useRef(null);
    const loginInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    function CheckValidation(name, login, password){
        SetNameHint(nameValidationHint(name).hint);
        SetLoginHint(loginValidationHint(login).hint);
        SetPasswordHint(passwordValidationHint(password).hint);
        if(nameValidationHint(login).result && loginValidationHint(login).result && passwordValidationHint(password).result){
            return true;
        }
        return false;
    }

    async function SignUpButtonClick() {
        let name = nameInputRef.current.value;
        let login = loginInputRef.current.value;
        let password = passwordInputRef.current.value;
        if(!CheckValidation(name, login, password)){
            return null;
        }
        let responce
        try{
            if(responce = await SignUpFetch(name, login, password)){
                navigate('/');
            }
        }
        catch(e){
            if(axios.isAxiosError(e)){
                if(e.status==400){
                    alert("Имя или логин уже заняты");
                }
            }
        }

    }

    return (
        <Box className='w-full flex flex-col items-stretch bg-opacity-50 backdrop-blur-sm *:my-4 bg-custom-1 p-8 rounded-b-3xl'>
            <TextField.Root
                placeholder="name" 
                ref={nameInputRef} 
                />
            
            {nameHint!=''?
            <Callout.Root className='max-w-full' color="red">
                <Callout.Text wrap="wrap">
                    {loginHint}
                </Callout.Text>
            </Callout.Root>
            :''}
            <TextField.Root
                placeholder="login" 
                ref={loginInputRef} 
                />
            
            {loginHint!=''?
            <Callout.Root className='max-w-full' color="red">
                <Callout.Text wrap="wrap">
                    {loginHint}
                </Callout.Text>
            </Callout.Root>
            :''
            }
            <TextField.Root  
                placeholder="password" 
                ref={passwordInputRef} 
                validatehintfunc={passwordValidationHint}
                />
            {passwordHint!=''?

            <Callout.Root className='max-w-full' color="red">
                <Callout.Text wrap="wrap">
                    {passwordHint}
                </Callout.Text>
            </Callout.Root>
            :''
            }

	        <button className={styles.baseButton+styles.button2+'text-base'} onClick={SignUpButtonClick}>Регистрация</button>
        </Box>
    )
}


export default CSignUp
