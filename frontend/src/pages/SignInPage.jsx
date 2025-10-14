import { useEffect, useState, useRef } from 'react';

import Header from "../custom_elements/Header"
import { Navigate } from 'react-router';
import { getUserBySession } from '../../scripts/auth';
import { Tabs } from 'radix-ui';
import { Box } from '@radix-ui/themes';
import CSignIn from '../custom_elements/CSignIn';
import CSignUp from '../custom_elements/CSignUp';

function SignInPage() { 
    const [ redirect, SetRedirect ] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
                try {
                    if(await getUserBySession() != null){
                        SetRedirect(true);
                        console.log(1);
                    } 
                } catch (error) {
                    console.error("Load User Error:", error);
                }
            };
        fetchData(); 
    }, []);

    return (
        redirect?
        <Navigate to='/' replace />:
        <div className='flex flex-col items-stretch'>
            <Header></Header>
            <Tabs.Root defaultValue="signin" className='self-center mt-6 w-1/3'>
                <Tabs.List className='flex flex-row items-stretch justify-between min-w-56'>
                    <Tabs.Trigger className='text-custom-3 bg-custom-1 bg-opacity-20 backdrop-blur-sm w-1/2 rounded-tl-3xl [&[data-state="active"]]:bg-opacity-50' value="signin" on>Авторизация</Tabs.Trigger>
                    <Tabs.Trigger className='text-custom-3 bg-custom-1 bg-opacity-20 backdrop-blur-sm  w-1/2 rounded-tr-3xl [&[data-state="active"]]:bg-opacity-50' value="documents">Регистрация</Tabs.Trigger>
                </Tabs.List>

                <Box>
                    <Tabs.Content value="signin">
                        <CSignIn/>
                    </Tabs.Content>

                    <Tabs.Content value="documents">
                        <CSignUp/>
                    </Tabs.Content>

                </Box>
            </Tabs.Root>

        </div>
        
    );
}


export default SignInPage
