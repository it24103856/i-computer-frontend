import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  async function login() {
    try {
     const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
        email,
        password,
      });
      console.log(res)
      if(res.data.role == "admin"){
       // window.location.href = "/admin"
        navigate("/admin")
      } else {
        //window.location.href = "/"
        navigate("/") 
      }
      console.log("Response:", res.data);
      toast.success("Login successful!");
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Error during login:", err);
      
     
    }
  }

  return (
    <div className="w-full min-h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex items-center justify-end gap-10 px-24">
      <div className="mr-auto max-w-[620px]">
        <img src="/logo.png" alt="Logo" className="w-32 mb-6" />
        <h1 className="text-yellow-400 font-bold text-4xl leading-tight">
          Plug In. Power Up. Play <br /> Hard.
        </h1>
        <p className="mt-3 text-white/90 italic text-xl">
          Your Ultimate Destination for Gaming Gear
        </p>
      </div>

      <div className="w-[450px] h-[600px] rounded-2xl bg-white/20 backdrop-blur-xl shadow-2xl p-10">
        <h1 className="text-[40px] font-bold mb-5 text-white">Login</h1>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your Email"
          className="w-full p-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <p className="text-white not-italic w-full mb-[20px]">
          Forget Password?
          <Link to="/froget-Password" className="text-yellow-400 hover:underline italic">
            {" "}Click Here
          </Link>
        </p>

        <button
          onClick={login}
          className="w-full bg-accent text-white font-bold py-4 rounded-lg border border-accent hover:bg-transparent transition-colors"
        >
          Sign In
        </button>

        <p className="text-white not-italic mt-4">
          Don't have an account?
          <Link to="/signup" className="text-yellow-400 hover:underline italic">
            {" "}Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
