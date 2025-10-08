import React from "react";
import ReactDom from 'react-dom/client'

import { BrowserRouter, Routes, Route } from "react-router"
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import './index.css' 

import MainPage from './pages/MainPage.jsx'
import SignInPage from "./pages/SignInPage.jsx";
import SecpassPage from "./pages/SecpassPage.jsx";

ReactDom.createRoot(document.getElementById('root')).render(
	<Theme>
    <div className="bg-custom-2 min-h-screen">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignInPage/>} />
        <Route path="/secpasses" element={<SecpassPage/>} />
        <Route path="*" element={<h2> не найден</h2>} />
      </Routes>  
    </BrowserRouter>
    </div>
	</Theme>
)
