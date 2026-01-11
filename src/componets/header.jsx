import{ Link } from "react-router-dom"
export default function Header() {
    return(
        <header className='w-full h-24 bg-accent flex justify-center items-center text-white text-[30px] font-bold'>
           <img src="/logo.png" alt="Logo" className="h-full" />
           <div className="w-full h-full flex text-primary justify-center items-center border-r-2 border-l-2 border-primary  gap-[30px]">
            <Link to="/">Home</Link>
           <Link to="/products">Products</Link>
           <Link to="/about">About</Link>
           <Link to="/contact">Contact</Link>
           </div>
            
         
        </header>
    )
}