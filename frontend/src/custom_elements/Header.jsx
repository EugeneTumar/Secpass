import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { Button } from "@radix-ui/themes";

import CUserHeaderIcon from './CUserHeaderIcon'

function Header() { 
  const navigate = useNavigate();

  return (
    <div className='header flex flex-row items-center bg-custom-1'>
      <Link to='/'>
      <img src="../public/logo.png" className='h-16' onClick={()=>{navigate('/')}}/>
      </Link>
      <span className='mx-3 text-custom-3 text-2xl'>SecPass</span>

      <div className='ml-auto mr-2'>
        <CUserHeaderIcon></CUserHeaderIcon>
      </div>
      
    </div>
  )
}

export default Header 
