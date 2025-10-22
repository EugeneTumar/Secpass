import { useRef, useState } from "react";
import CTextField from "../custom_elements/CTextField";
import Header from "../custom_elements/Header"
import styles from "../styles";
import { updateUser } from "../../scripts/auth";



function UserSettingsPage() {
    const nameRef = useRef();
    const loginRef = useRef();
    const passwordRef = useRef();

    const [rerender, setRerender] = useState(1);

    const forceRerender = () => {
        setRerender(rerender+1);
    };

    async function updateUserName() {
        const user = {name:nameRef.current.value, login:null, password:null };
        await updateUser(user);
        forceRerender();
    }
    async function updateUserLogin() {
        const user = {name:null, login:loginRef.current.value, password:null };
        updateUser(user);
    }
    async function updateUserPassword() {
        const user = {name:null, login:null, password:passwordRef.current.value };
        updateUser(user);
    }

    return ( 
    <div>
        <Header rerenderValue={rerender}/>

        <div className='flex justify-center'>
            <div className='flex flex-col items-start p-6 mt-6 w-11/12 min-h-12 bg-opacity-50 backdrop-blur-sm *:my-2 bg-custom-1 rounded-xl text-custom-3 [&>input]:bg-custom-1'>
                <CTextField ref={nameRef} name='Изменить имя' placeholder="новое имя"/>
                <button onClick={updateUserName} className={styles.baseButton+styles.button1}>Изменить имя</button>
                <CTextField ref={loginRef} name="Изменить логин" placeholder="новый логин"/>
                <button onClick={updateUserLogin} className={styles.baseButton+styles.button1}>Изменить логин</button>
                <CTextField ref={passwordRef} name="Изменить пароль" placeholder="новый пароль"/>
                <button onClick={updateUserPassword} className={styles.baseButton+styles.button1}>Изменить пароль</button>
            </div>
            
        </div>
    </div> 
    );
}

export default UserSettingsPage;