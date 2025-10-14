import { useState, useEffect } from "react";

import { DropdownMenu, Button } from "@radix-ui/themes";
import { Label } from "@radix-ui/themes/components/context-menu";

import { getUserBySession, logOut } from '../../scripts/auth'
import { Link, useNavigate } from "react-router";
import styles from "../styles";

function CUserHeaderIcon(props){
    const [user, SetUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
                try {
                    const user = await getUserBySession();
                    SetUser(user);
                } catch (error) {
                    console.error("Load User Error:", error);
                }
            };
        fetchData(); 
    }, []);

    async function LogOutHandler() {
        await logOut();
        SetUser(null);
    }

    return (
        user!=null ? 
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <button className={styles.baseButton+styles.button2}>
                        {user.name}
                    </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <Label>{user.name}</Label>
                    <DropdownMenu.Item>Настройки</DropdownMenu.Item>
                    <DropdownMenu.Item onClick={()=>{navigate('/secpasses')}}>Мои пароли</DropdownMenu.Item>
                    <DropdownMenu.Item onClick={LogOutHandler}>Выйти</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            :   
            <Link to='/signin'>
                <button className={styles.baseButton+styles.button2}>
                    Войти
                </button>
            </Link>
        )
}

export default CUserHeaderIcon;