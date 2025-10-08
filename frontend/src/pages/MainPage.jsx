import { useEffect, useState } from 'react';
import { Link } from "react-router";
import Header from "../custom_elements/Header"
import "./MainPage.css"

function MainPage() { 

  return (
    <div className='app'>
      <Header></Header>
      <span className='save-text'>Безопасное хранение паролей</span>
      <img src="../public/save.png" className='main-img'></img>  
      <Link hrefLang='' className='how-work-link'>как это работает?</Link>
    </div>
  )
}

export default MainPage
