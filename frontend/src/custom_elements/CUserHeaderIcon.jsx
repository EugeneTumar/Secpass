import { useState, useEffect, useContext } from "react";

import { DropdownMenu } from "@radix-ui/themes";
import { Label } from "@radix-ui/themes/components/context-menu";

import { getUserBySession, logOut } from '../../scripts/auth'
import { Link, useNavigate } from "react-router";
import styles from "../styles";
import global from "../globalVar";
import MyContext from "../MyContext";

function CUserHeaderIcon({rerenderValue}){
    const [user, SetUser] = useState(null);
    const navigate = useNavigate();
    const reloadPage = useContext(MyContext);

    const fetchData = async () => {
        try {
            const user = await getUserBySession();
            SetUser(user);
        } catch (error) {
            console.error("Load User Error:", error);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [rerenderValue]);

    async function LogOutHandler() {
        await logOut();
        SetUser(null);
        navigate('/');
    }
    global.user = user;
    return (
        user!=null ? 
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <button className={styles.baseButton+styles.button3}>
                        {user.name}
                    </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <Label>{user.name}</Label>
                    <DropdownMenu.Item onClick={()=>{navigate('/settings')}}>Настройки</DropdownMenu.Item>
                    <DropdownMenu.Item onClick={()=>{navigate('/secpasses')}}>Мои пароли</DropdownMenu.Item>
                    <DropdownMenu.Item onClick={LogOutHandler}>Выйти</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            :   
            <Link to='/signin'>
                <button className={styles.baseButton+styles.button3}>
                    Войти
                </button>
            </Link>
        )
}

export default CUserHeaderIcon;