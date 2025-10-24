import { Link, useNavigate } from 'react-router';


import CUserHeaderIcon from './CUserHeaderIcon'

function Header({rerenderValue}) { 
  const navigate = useNavigate();

  return (
    <div className='header flex flex-row items-center bg-custom-1 opacity-80 shadow-custom-3 shadow-md'>
      <Link to='/'>
      <img src="../public/logo.png" className='h-16' onClick={()=>{navigate('/')}}/>
      </Link>
      <span className='mx-3 text-custom-3 text-2xl'>SecPass</span>

      <div className='ml-auto mr-2'>
        <CUserHeaderIcon rerenderValue={rerenderValue}/>
      </div>
      
    </div>
  )
}

export default Header 
