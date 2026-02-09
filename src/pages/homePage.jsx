import { Route, Routes } from "react-router-dom"
import Header from "../components/header"
import ProductPage from "./productPage"
import ProductOverview from "./productOverview"
import Cartpage from "./cart"
import CheckOutPage from "./checkOut"
import UserData from "../components/userData"
import OrdersPage from "./ordersPage"

export default function HomePage(){
    
    return(
        <div className="w-full h-full overflow-y-scroll max-h-full">
            <Header />
            
            <div className=" w-full min-h-[calc(100%-100px)] ">
                <Routes>
                    <Route path="/" element={<h1>Home Page</h1>} />
                    <Route path="/products" element={<h1><ProductPage/></h1>} />
                    <Route path="/overview/:productID" element={<ProductOverview/>}  />
                    <Route path="/about" element={<h1>About Page</h1>} />
                    <Route path="/contact" element={<h1>Contact Page</h1>} />
                    <Route path="/cart" element={<Cartpage/>} />
                        <Route path="/checkout" element={<CheckOutPage/>} />
                    <Route path="/profile" element={<UserData />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/*" element={<h1>404 Page</h1>} />
                </Routes>
               
            </div>
        </div>
    )
}