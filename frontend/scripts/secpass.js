import axios from "axios";
import { getSession } from "./auth";
import Setting from "../config";


export async function getSecpassList() {
    const session = getSession();

    return (await axios.get(Setting.server.url + `/getsecpasslist?session=${session}`)).data.data;
}

export async function addSecpass(secpass) {
    const session = getSession();

    await axios.post(Setting.server.url + `/addsecpass`, secpass, {params: {session}});
}

export async function deleteSecpass(secpass) {
    const session = getSession();
    const id = secpass.id;
    await axios.post(Setting.server.url + `/delsecpass`, {}, {params: {session, id}});
}

export async function decryptSecpass(secpass, password) {
    const secpass_id = secpass.id;
    const secret_key = password;
    const session = getSession();

    const response = await axios.get(Setting.server.url + `/decryptsecpass`, {params: {secpass_id, secret_key, session}});
    return response.data;
}