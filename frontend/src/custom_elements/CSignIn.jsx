import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, Callout } from "@radix-ui/themes";

import { loginValidationHint, passwordValidationHint } from '../../scripts/validate'
import { SignInFetch } from '../../scripts/auth'
import CInput from '../custom_elements/CInput'
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
        <Box className='m-auto w-fit flex flex-col items-stretch bg-opacity-50 backdrop-blur-sm *:my-4 bg-custom-1 mt-7 p-8 rounded-3xl'>
                <CInput
                placeholder="login" 
                textFieldRef={loginInputRef} 
                validatehintfunc={loginValidationHint}
                />
            
            {loginHint!=''?
            <Callout.Root className='invisible' color="red">
                <Callout.Text>
                    {loginHint}
                </Callout.Text>
            </Callout.Root>
            :''
            }
            <CInput  
                placeholder="password" 
                textFieldRef={passwordInputRef} 
                validatehintfunc={passwordValidationHint}
                />
            {passwordHint!=''?
            <Callout.Root className='invisible' color="red">
                <Callout.Text>
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
