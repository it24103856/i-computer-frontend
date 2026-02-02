import './App.css'
import HomePage from './pages/homePage'
import AdminPage from './pages/adminPage'
import LoginPage from './pages/loginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import TestPage from './pages/testPage'
import AboutPage from './pages/AboutPage';
import RegisterPage from './pages/registerPage';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

//601712598116-ckm9o17glc4rkas75394cfdcp74glbig.apps.googleusercontent.com

function App() {
  return (
    <GoogleOAuthProvider clientId="601712598116-ckm9o17glc4rkas75394cfdcp74glbig.apps.googleusercontent.com">
    <BrowserRouter>
      <Toaster />
      <div className='w-full h-screen bg-[#F3F4F6] text-[#1F1F1F]'>
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/about" element={<AboutPage />} />

          
        </Routes>


      </div>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
