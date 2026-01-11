
import './App.css'
import Test from './componets/test'
import Header from './componets/header'
import ProductCard from './componets/productCard'
import HomePage from './pages/homePage'
import AdminPage from './pages/adminPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
	<BrowserRouter>
	<div className='w-full h-screen bg-[#F3F4F6] text-[#1F1F1F]'>
		<Routes >
		<Route path="/*" element={<HomePage />} />
		<Route path="/login" element={<h1>login</h1> }/>
		<Route path="/register" element={<h1> Register </h1>} />
		
		<Route path="/admin/*" element={<AdminPage/>} />
		
		
		</Routes>
	  
	  <Test />
	  
	</div>
	</BrowserRouter>
  )

}

export default App