import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { Box, Button, Callout, TextField } from "@radix-ui/themes";

import { loginValidationHint, passwordValidationHint } from '../../scripts/validate'
import { SignInFetch } from '../../scripts/auth'
import styles from '../styles';

function CSignIn() {
    const navigate = useNavigate();
    

    const [loginHint, SetLoginHint] = useState('');
    const [passwordHint, SetPasswordHint] = useState('');

    const loginInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    function CheckValidation(login, password){
        SetLoginHint(loginValidationHint(login).hint);
        SetPasswordHint(passwordValidationHint(password).hint);
        if(loginValidationHint(login).result && passwordValidationHint(password).result){
            return true;
        }
        return false;
    }

    async function SignInButtonClick() {
        console.log(loginInputRef);
        let login = loginInputRef.current.value;
        let password = passwordInputRef.current.value;
        if(!CheckValidation(login, password)){
            console.log('Валидация не пройдена');
            return null;
        }

        if(await SignInFetch(login, password)){
            navigate('/');
        }

    }

    return (
        <Box className='w-full flex flex-col items-stretch bg-opacity-50 backdrop-blur-sm *:my-4 bg-custom-1 p-8 rounded-b-3xl'>
                <TextField.Root
                placeholder="login" 
                ref={loginInputRef} 
                />
            
            {loginHint!=''?
            <Callout.Root className='max-w-full' color="red">
                <Callout.Text wrap="wrap" className=''>
                    {loginHint}
                </Callout.Text>
            </Callout.Root>
            :''
            }
            <TextField.Root  
                type='password'
                placeholder="password" 
                ref={passwordInputRef} 
                validatehintfunc={passwordValidationHint}
                />
            {passwordHint!=''?

            <Callout.Root className='max-w-full' color="red">
                <Callout.Text wrap="wrap" className=''>
                    {passwordHint}
                </Callout.Text>
            </Callout.Root>
            :''
            }

	        <button className={styles.baseButton+styles.button2+'text-base'} onClick={SignInButtonClick}>Войти</button>
        </Box>
    )
}


export default CSignIn
