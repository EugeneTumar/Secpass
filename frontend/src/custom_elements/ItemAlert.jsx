import { useRef, useState } from 'react';
import { TextField, Box, Callout, Text, AlertDialog, Button, Inset, Flex, Theme } from "@radix-ui/themes";
import { deleteSecpass, decryptSecpass } from '../../scripts/secpass';
import styles from '../styles';
import animatations from '../animations';
import { ServerError, WrongPasswordError } from '../../exceptions';
import axios from 'axios';
import { TrashIcon, Pencil1Icon, LockClosedIcon, LockOpen2Icon } from "@radix-ui/react-icons"

function ItemAlert(props) {
    const { item, rerenderCallback } = props;

    const [decryptData, SetDecryptData] = useState(null);
    const [open, SetOpen] = useState(false);
    const [passwordText, SetPasswordText] = useState('');
    const [shakingTextfield, SetShakingTexfield] = useState(false);

    async function decryptSecpassHandler() {
        try {
            const res = await decryptFetch(item, passwordText);
            SetDecryptData(res);
            SetOpen(false);
        }
        catch (e) {
            if (e instanceof WrongPasswordError)
                wrongPasswordHandler();
            if (axios.isAxiosError(e)) {
                if (e.response.status == 400)
                    wrongPasswordHandler();
            }
        }

        SetPasswordText('');
    }

    async function decryptFetch(item, password) {
        try {
            const res = await decryptSecpass(item, password);
            return res;
        }
        catch (e) {
            throw e;
        }
    }

    function wrongPasswordHandler() {
        SetShakingTexfield(true);
        setTimeout(() => {
            SetShakingTexfield(false);
        }, 500);
    }

    async function textfieldChange(e, SetState) {
        SetState(e.target.value);
    }

    async function deleteSecpassHandler() {
        deleteSecpass(item);
        rerenderCallback();
    }


    return (
        <>
            <div className='m-1 w-fit float-left'>
                <div className='flex' style={{ 'flexDirection': 'row' }}>
                    {decryptData != null ?
                        <button className={styles.button1 + styles.baseButton + 'rounded-l flex-1'} onClick={()=>navigator.clipboard.writeText(decryptData)}>
                            {decryptData}
                        </button>
                        : <button className={styles.button1 + styles.baseButton + 'rounded-l flex-1'} onClick={()=>navigator.clipboard.writeText(item.label)}>
                            {item.label}
                        </button>}

                    {decryptData == null ?
                        <button className={styles.baseButton + 'bg-custom-5 flex-1'} onClick={() => SetOpen(true)}>
                            <LockClosedIcon></LockClosedIcon>
                        </button>
                        : <button className={styles.baseButton + 'bg-custom-5 flex-1'} onClick={() => SetDecryptData(null)}>
                            <LockOpen2Icon></LockOpen2Icon>
                        </button>}

                    <button className={styles.baseButton + 'bg-custom-6 flex-1'}>
                        <Pencil1Icon></Pencil1Icon>
                    </button>

                    <button className={styles.baseButton + 'bg-custom-4 text-black rounded-r flex-1'} onClick={deleteSecpassHandler}>
                        <TrashIcon></TrashIcon>
                    </button>
                </div>
            </div>
            <AlertDialog.Root open={open} onOpenChange={SetOpen}>
                <AlertDialog.Trigger>
                    <div></div>
                </AlertDialog.Trigger>
                    <AlertDialog.Title></AlertDialog.Title>
                    <AlertDialog.Content maxWidth="450px" className='bg-custom-1 text-custom-1'>
                        <Inset side="x" my="5" className='m-0 border-none'>
                            <input placeholder='Пароль' className={`${shakingTextfield ? animatations.incorectInput : ''} bg-custom-1 text-custom-3 placeholder:text-custom-3border-0 focus:outline-none border-b w-full my-4`} onChange={(e) => textfieldChange(e, SetPasswordText)} value={passwordText}></input>
                        </Inset>

                        <Flex gap="3" mt="4" justify="end">
                            <AlertDialog.Cancel>
                                <button className={styles.baseButton+ styles.button2}>
                                    Отмена
                                </button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action onClick={(e) => e.preventDefault()}>
                                <Button variant="solid" color="green" onClick={decryptSecpassHandler}>
                                    Расшифровать
                                </Button>
                            </AlertDialog.Action>
                        </Flex>
                    </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default ItemAlert