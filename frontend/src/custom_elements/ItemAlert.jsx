import { useRef, useState } from 'react';
import axios from 'axios';

import { VisuallyHidden } from "radix-ui";
import { AlertDialog, Button, Inset, Flex } from "@radix-ui/themes";
import { TrashIcon, Pencil1Icon, LockClosedIcon, LockOpen2Icon } from "@radix-ui/react-icons"

import { deleteSecpass, decryptSecpass, updateLabel } from '../../scripts/secpass';
import styles from '../styles';
import animatations from '../animations';

function ItemAlert(props) {
    const { item, rerenderCallback } = props;

    const [decryptData, SetDecryptData] = useState(null);

    const [openDecryptAlert, SetOpenDecryptAlert] = useState(false);
    const [passwordText, SetPasswordText] = useState('');
    const [shakingPasswordField, SetShakingPasswordField] = useState(false);

    const [newLabelText, SetNewLabelText] = useState('');
    const [openUpdateAlert, SetOpenUpdateAlert] = useState(false);
    const [shakingLabelField, SetShakingLabelField] = useState(false);

    async function decryptSecpassHandler() {
        try {
            const res = await decryptSecpass(item, passwordText);
            SetDecryptData(res);
            SetOpenDecryptAlert(false);
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response.status == 400)
                    wrongTextfieldHandler(SetShakingPasswordField);
            }
        }

        SetPasswordText('');
    }

    async function updateLabelHandler() {
        try {
            const res = await updateLabel(item, newLabelText);
            SetOpenUpdateAlert(false);
            rerenderCallback();
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                if (e.response.status == 400)
                    wrongTextfieldHandler(SetShakingLabelField);
            }
        }

        SetNewLabelText('');
    }

    function wrongTextfieldHandler(SetAnim) {
        SetAnim(true);
        setTimeout(() => {
            SetAnim(false);
        }, 500);
    }

    async function textfieldChange(e, SetState) {
        SetState(e.target.value);
    }

    async function deleteSecpassHandler() {
        await deleteSecpass(item);
        rerenderCallback();
    }


    return (
        <>
            <div className='m-1 w-fit float-left'>
                <div className='flex' style={{ 'flexDirection': 'row' }}>
                    {decryptData != null ?
                        <button className={styles.button2 + styles.baseButton + 'border-r-0 rounded-l flex-1'} onClick={()=>navigator.clipboard.writeText(decryptData)}>
                            {decryptData}
                        </button>
                        : <button className={styles.button2 + styles.baseButton + 'border-r-0 rounded-l flex-1'} onClick={()=>navigator.clipboard.writeText(item.label)}>
                            {item.label}
                        </button>}

                    {decryptData == null ?
                        <button className={styles.baseButton + styles.button2 + 'border-x-0 flex-1'} onClick={() => SetOpenDecryptAlert(true)}>
                            <LockClosedIcon></LockClosedIcon>
                        </button>
                        : <button className={styles.baseButton + styles.button2 + 'border-x-0 flex-1'} onClick={() => SetDecryptData(null)}>
                            <LockOpen2Icon></LockOpen2Icon>
                        </button>}

                    
                    <button className={styles.baseButton + styles.button2 + 'border-x-0 flex-1'} onClick={() => SetOpenUpdateAlert(true)}>
                        <Pencil1Icon></Pencil1Icon>
                    </button>

                    <button className={styles.baseButton + styles.button2 + 'border-l-0 rounded-r flex-1'} onClick={deleteSecpassHandler}>
                        <TrashIcon></TrashIcon>
                    </button>
                </div>
            </div>

            {/* Decrypt alert */}
            <AlertDialog.Root open={openDecryptAlert} onOpenChange={SetOpenDecryptAlert}>
                    <VisuallyHidden.Root><AlertDialog.Title/></VisuallyHidden.Root>
                    <AlertDialog.Content maxWidth="450px" className='bg-custom-1 text-custom-1'>
                        <Inset side="x" my="5" className='m-0 border-none'>
                            <input placeholder='Пароль' className={`${shakingPasswordField ? animatations.incorectInput : ''} bg-custom-1 text-custom-3 placeholder:text-custom-3border-0 focus:outline-none border-b w-full my-4`} onChange={(e) => textfieldChange(e, SetPasswordText)} value={passwordText}></input>
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

            {/* Update label alert */}
            <AlertDialog.Root open={openUpdateAlert} onOpenChange={SetOpenUpdateAlert}>
                    <VisuallyHidden.Root><AlertDialog.Title/></VisuallyHidden.Root>
                    <AlertDialog.Content maxWidth="450px" className='bg-custom-1 text-custom-1'>
                        <Inset side="x" my="5" className='m-0 border-none'>
                            <input placeholder='Новое название' 
                            className={`${shakingLabelField ? animatations.incorectInput : ''} bg-custom-1 text-custom-3 placeholder:text-custom-3border-0 focus:outline-none border-b w-full my-4`} 
                            onChange={(e) => textfieldChange(e, SetNewLabelText)} 
                            value={newLabelText}></input>
                        </Inset>

                        <Flex gap="3" mt="4" justify="end">
                            <AlertDialog.Cancel>
                                <button className={styles.baseButton+ styles.button2}>
                                    Отмена
                                </button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action onClick={(e) => e.preventDefault()}>
                                <Button variant="solid" color="green" onClick={updateLabelHandler}>
                                    Изменить
                                </Button>
                            </AlertDialog.Action>
                        </Flex>
                    </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default ItemAlert