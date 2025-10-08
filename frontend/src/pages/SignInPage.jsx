import { useEffect, useState, useRef } from 'react';

import Header from "../custom_elements/Header"
import CSignIn from "../custom_elements/CSignIn"

function SignInPage() { 
    const loginInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    return (
        <div className='flex flex-col items-stretch'>
            <Header></Header>
            <div>
                <CSignIn/>
            </div>
            
        </div>
    )
}


export default SignInPage
