import { useRef, useState } from 'react';
import { TextField, Box, Callout, Text, AlertDialog, Button, Inset, Flex, Theme } from "@radix-ui/themes";
import { addSecpass } from '../../scripts/secpass';


function AddItemAlert(props) { 
    const { rerenderCallback } = props;
    const [ labelText, SetLabelText ] = useState('');
    const [ secpassText, SetSecpassText ] = useState('');
    const [ passwordText, SetPasswordText ] = useState('');

    async function CreateSecpassHandler() {
        let secpass = {
            data: secpassText,
            label: labelText,
            key: passwordText,
        }
        await addSecpass(secpass);
        try{
            rerenderCallback();
        }
        catch(e){
            console.log(rerenderCallback);
            console.log(e);
        }

    }

    async function textfieldChange(e, SetState) {
        SetState(e.target.value);
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger className='w-screen'>
                <Button className='bg-green-800'>Создать секрет</Button>
            </AlertDialog.Trigger>
            <Theme appearance='dark'>
                <AlertDialog.Content maxWidth="450px" color="grey">
                    <AlertDialog.Title>Создание секрета</AlertDialog.Title>
                    <AlertDialog.Description></AlertDialog.Description>
                    <Inset side="x" my="5">
                        <Text>Название</Text>
                        <TextField.Root onChange={(e)=>textfieldChange(e, SetLabelText)} value={labelText}></TextField.Root>
                        <Text>Секрет</Text>
                        <TextField.Root onChange={(e)=>textfieldChange(e, SetSecpassText)} value={secpassText}></TextField.Root>
                        <Text>Пароль</Text>
                        <TextField.Root onChange={(e)=>textfieldChange(e, SetPasswordText)} value={passwordText}></TextField.Root>
                    </Inset>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Отмена
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action onClick={CreateSecpassHandler}>
                            <Button variant="solid" color="green">
                                Создать
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </Theme>
        </AlertDialog.Root>
    )
}

export default AddItemAlert