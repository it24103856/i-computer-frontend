import { BiShoppingBag, BiX, BiHomeAlt, BiPackage, BiInfoCircle, BiPhoneCall } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";

export default function Header() {
    const [sideBarOpen, setSideBarOpen] = useState(false);

    // Sidebar
    const navLinks = [
        { name: "Home", path: "/", icon: <BiHomeAlt size={20} /> },
        { name: "Products", path: "/products", icon: <BiPackage size={20} /> },
        { name: "About", path: "/about", icon: <BiInfoCircle size={20} /> },
        { name: "Contact", path: "/contact", icon: <BiPhoneCall size={20} /> },
    ];

    return (
        <header className='w-full h-20 bg-accent flex items-center justify-between px-6 lg:px-12 sticky top-0 z-50 shadow-lg'>
            
            {/* Mobile Menu Icon */}
            <div className="lg:hidden flex items-center">
                <CiMenuBurger 
                    className="text-white text-3xl cursor-pointer hover:text-primary transition-all active:scale-90" 
                    onClick={() => setSideBarOpen(true)} 
                />
            </div>

            {/* Logo Section */}
            <div className="h-full py-3 flex items-center">
                <img src="/logo.png" alt="Logo" className="h-full object-contain hover:scale-105 transition-transform" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 h-full">
                {navLinks.map((link) => (
                    <Link 
                        key={link.name}
                        to={link.path} 
                        className="text-gray-300 font-medium hover:text-primary transition-all duration-300 relative group"
                    >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                ))}
            </nav>

            {/* Cart Icon Section */}
            <Link 
                to="/cart" 
                className="relative p-2 rounded-full hover:bg-white/10 transition-all group"
            >
                <BiShoppingBag size={28} className="text-primary group-hover:animate-bounce" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold border-2 border-accent">
                    0
                </span>
            </Link>

            {/* --- MODERN MOBILE SIDEBAR --- */}

            {/* Overlay with blur effect */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-all duration-500 ${
                    sideBarOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={() => setSideBarOpen(false)}
            />

            {/* Sidebar Panel */}
            <div 
                className={`fixed top-0 left-0 w-[280px] h-screen bg-white z-[70] transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col shadow-2xl ${
                    sideBarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
                    <img src="/logo.png" alt="Logo" className="h-10" />
                    <button 
                        onClick={() => setSideBarOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <BiX size={28} className="text-gray-600" />
                    </button>
                </div>

                {/* Sidebar Links with Icons */}
                <div className="flex flex-col p-4 gap-2">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name}
                            to={link.path} 
                            onClick={() => setSideBarOpen(false)}
                            className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-primary/10 hover:text-primary transition-all group"
                        >
                            <span className="text-gray-400 group-hover:text-primary transition-colors">
                                {link.icon}
                            </span>
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Sidebar Footer */}
                <div className="mt-auto p-6 border-t border-gray-100">
                    <p className="text-xs text-center text-gray-400">© 2024 Your Store Name</p>
                </div>
            </div>
        </header>
    );
}