import ReactDom from 'react-dom/client'

import { BrowserRouter, Routes, Route } from "react-router"
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import './index.css' 

import MainPage from './pages/MainPage.jsx'
import SignInPage from "./pages/SignInPage.jsx";
import SecpassPage from "./pages/SecpassPage.jsx";
import UserSettingsPage from "./pages/UserSettingsPage.jsx";

ReactDom.createRoot(document.getElementById('root')).render(
	<Theme>
      <div className="min-h-screen bg-gradient-to-br from-sky-950 to-indigo-800">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signin" element={<SignInPage/>} />
            <Route path="/secpasses" element={<SecpassPage/>} />
            <Route path="/settings" element={<UserSettingsPage/>} />
            <Route path="*" element={<h2> не найден</h2>} />
          </Routes>  
        </BrowserRouter>
      </div>
	</Theme>
)
