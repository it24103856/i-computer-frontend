import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlineListAlt } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { LuBoxes } from "react-icons/lu";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductsPage from "./admin/adminAddProductPage";
import AdminUpdateProductsPage from "./admin/adminUpdateProductPage";
import AdminOrdersPage from "./admin/adminOrderPage";
import { useState, useEffect} from "react";
import axios from "axios";
import Loader from "../components/loader";
import AdminUserPage from "./admin/admiinUsersPage";

export default function AdminPage(){
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        // Shield: No token → redirect to login
        if (!token) {
            navigate("/login");
            return;
        }

        // Fetch user details from backend
        axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            // Shield: Check if user is admin
            if (response.data.role === "admin") {
                setUser(response.data);
                setIsLoading(false);
            } else {
                // NOT an admin → redirect to home
                navigate("/");
            }
        })
        .catch((err) => {
            console.error("Auth error:", err);
            // Invalid token or error → redirect to login
            localStorage.removeItem("token");
            navigate("/login");
        });
    }, [navigate]);

    // Show loader while checking authentication
    if (isLoading) {
        return <Loader />;
    }

    // Only render admin UI if authenticated and authorized
    return(
        <div className="w-full h-full flex">
            
            <>
            <div className="w-[300px]  bg-green-950 h-full">
            <div className="w-full h-[100PX] flex items-center text-primary  ">
                <img src="/logo.png" alt="logo" className="h-full "/>
                <h1 className="text-2xl">Admin page</h1>
            </div>
            <div className="w-full h-[400px] text-white tesxt-2xl flex flex-col">
                <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 p-2"><MdOutlineListAlt />
Orders</Link>
                <Link to="/admin/product" className="text-yellow-400 hover:text-yellow-300 p-2"><LuBoxes />Products</Link>
                <Link to="/admin/users" className="text-yellow-400 hover:text-yellow-300 p-2"><FaUsers />Users</Link>
                <Link to="/admin/reviews" className="text-yellow-400 hover:text-yellow-300 p-2"><MdOutlineRateReview />Reviews</Link>
             </div>

            </div>
            <div className="w-[calc(100%-300px)] h-full max-h-full  overflow-y-scroll border-[10px] rounded-4xl border-green-950 ">
                <Routes>
                    <Route path="/" element={<AdminOrdersPage />} />
                    <Route path="product" element={<AdminProductsPage />} />
                    <Route path="/add-product" element={<AdminAddProductsPage />} />
                    <Route path="/update-product/:id" element={<AdminUpdateProductsPage />} />
                    <Route path="/" element={<AdminProductsPage />} />
                    <Route path="/users" element={<AdminUserPage />} />
                    <Route path="/reviews" element={<div className="p-4"><h2 className="text-2xl font-bold mb-4">Reviews</h2><p>Review management content goes here.</p></div>} />
                    <Route path="*" element={<div className="p-4"><h1 className="text-2xl">Admin Dashboard</h1><p className="text-slate-600">Select an option from the sidebar to manage your content.</p></div>} />
                    
                </Routes>
            </div>
            </>

        </div>
    )
}