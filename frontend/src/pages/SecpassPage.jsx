import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router";
import Header from "../custom_elements/Header"
import "./MainPage.css"
import SecpassList from '../custom_elements/SecpassList';

import { getUserBySession } from '../../scripts/auth'
import { Spinner } from '@radix-ui/themes';

function SecpassPage() { 
  const [isAuth, SetAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchData = async () => {
        try {
          if(await getUserBySession()!=null)
            SetAuth(true);
          else
            navigate('/signin')
        } catch (error) {
          console.error("Load User Error:", error);
        }
      };
      fetchData(); 
    }, []);

  return (
    <div className='app'>
        <Header></Header>
        {isAuth?<SecpassList></SecpassList>:<Spinner className='m-auto'/>}
    </div>
  )
}

export default SecpassPage