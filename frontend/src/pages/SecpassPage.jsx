import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";

import Header from "../custom_elements/Header"
import SecpassList from '../custom_elements/SecpassList';
import "./MainPage.css"

import { getSession } from '../../scripts/auth'

function SecpassPage() {  
  const [rerender, setRerender] = useState(true);
  const navigate = useNavigate();

  function reloadPage(){
    setRerender(rerender);
  }

  const fetchData = async () => {
    try {
    } catch (error) {
      console.error("Load User Error:", error);
    }
  };

  function checkAuth() {
    try{
      alert(getSession());
    }catch(e){ 
      navigate('/signin');
    }
    return null
  }
  checkAuth();
  useEffect(() => {
      fetchData(); 
    }, []);

  return (
    
    <div className='app'>
      <Header></Header>
      <SecpassList></SecpassList>
    </div>
  )
}

export default SecpassPage