import axios from "axios";
import Cookies from 'js-cookie';
import Setting from "../config";


export async function SignUpFetch(name, login, password) {
    if(name == null || login == null || password == null){
        console.log("Sign up data null or undefined");
        return false;
    }
        
    await axios.post(Setting.server.url + `/signup`, {name: name, login:login, password:password});
    await SignInFetch(login, password);
    return true;
}

export async function SignInFetch(login, password) {
    if(login == null || password == null){
        console.log("Sign in data null or undefined");
        return false;
    }
        
    let sessionData = (await axios.post(Setting.server.url + `/signin?login=${login}&password=${password}`)).data;
    Cookies.set('session', sessionData.session, { expires: 7 });
    return true;
}

export async function getUserBySession(){
    try
    {
        const responce = await axios.get(Setting.server.url + `/getuser?session=${getSession()}`);
        return responce.data;
    }
    catch(e)
    {
    }
}

export async function logOut() {
    try
    {
        let session = getSession();

        await axios.post(Setting.server.url + `/signout?session=${session}`);
        Cookies.remove('session');
    }
    catch(e)
    {
        console.log(e);
    }
}

export function getSession(){
    let res = Cookies.get('session');
    if(res==null){
        throw new Error("Cookie not found");
    }
    return res;
}