import './App.css'
import Header from "./components/header";
import ProductCard from "./components/productCard";
import HomePage from './pages/homePage'
import AdminPage from './pages/adminPage'
import LoginPage from './pages/loginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import TestPage from './pages/testPage'

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <div className='w-full h-screen bg-[#F3F4F6] text-[#1F1F1F]'>
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<h1>Register</h1>} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>

        {/* ❌ REMOVE THIS */}
        {/* <Test /> */}

      </div>
    </BrowserRouter>
  )
}

export default App
