
import './App.css'
import Test from './componets/test'
import Header from './componets/header'
import ProductCard from './componets/productCard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
	<BrowserRouter>
	<div className='w-full h-screen bg-red-600'>
		<Routes path="/" >
		<Route path="/" element={<h1> Home  </h1>} />
		<Route path="/login" element={<h1>login</h1> }/>
		<Route path="/register" element={<h1> Register </h1>} />
		<Route path="/products" element={<ProductCard />} />
		
		
		</Routes>
	  
	  <Test />
	  
	</div>
	</BrowserRouter>
  )

}

export default App
