import { BiShoppingBag } from "react-icons/bi"
import{ Link } from "react-router-dom"
export default function Header() {
    return(
        <header className='w-full h-24 bg-accent flex relative '>
           <img src="/logo.png" alt="Logo" className="h-full" />
           <div className="w-full h-full flex text-primary justify-center items-center border-r-2 border-l-2 border-primary  gap-[30px]">
            <Link to="/">Home</Link>
           <Link to="/products">Products</Link>
           <Link to="/about">About</Link>
           <Link to="/contact">Contact</Link>
           </div>
            <Link 
    to="/cart" 
    className="h-full px-8 flex justify-center items-center relative group"
>
    <BiShoppingBag size={28} className="text-primary group-hover:scale-110 transition-transform" />
    
    {/* Cart Count Badge */}
    <span className="absolute top-6 right-6 bg-primary text-accent text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
        0
    </span>
</Link>
         
        </header>
    )
}