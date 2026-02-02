import { useState, useEffect } from 'react'
import axios from 'axios'

export default function UserData() {
    const [user, setUser] = useState(null);
    const [selectedOption, setSelectedOption] = useState("user");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token != null){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                setUser(response.data);
            })
            .catch((err) => {
                setUser(null);
                console.error("Auth error:", err);
            });
        }
    }, []);

    // Dropdown එක වෙනස් වන විට සිදුවන දේ
    const handleChange = (e) => {
        const val = e.target.value;
        setSelectedOption(val);

        if (val === "logout") {
            localStorage.removeItem("token");
            window.location.href = "/login";
        } else if (val === "my-orders") {
            window.location.href = "/orders";
        }
    }

    return (
        <>
            {user ? (
                <div className="flex flex-row items-center">
                    {/* පින්තූරය */}
                    <img 
                        src={user.image || '/default.png'} 
                        className='w-[50px] h-[50px] rounded-full object-cover'
                        alt="user"
                    />

                    {/* Dropdown එක මෙතනයි තියෙන්න ඕනේ */}
                    <select 
                        className="bg-transparent outline-none ml-2 text-white border-none cursor-pointer" 
                        value={selectedOption}
                        onChange={handleChange}
                    >
                        <option value="user" className="text-black">{user.firstName}</option>
                        <option value="my-orders" className="text-black">My Orders</option>
                        <option value="logout" className="text-black text-red-500">Logout</option>
                    </select>
                </div>
            ) : null}
        </>
    );
}