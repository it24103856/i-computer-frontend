import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const[isLoading,setIsLoading]=useState(false);

  // Changed function name to register and added validation
  async function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
if(firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || password.trim() === ""){
      toast.error("First Name and Last Name cannot be empty!");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/create", {
        firstName,
        lastName,
        email,
        password,
      });

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed.";
      toast.error(errorMsg);
    }
  }

  return (
    <div className="w-full min-h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex items-center justify-between px-10 lg:px-24">
      
      {/* Left Side: Branding */}
      <div className="hidden lg:block max-w-[500px]">
        <img src="/logo.png" alt="Logo" className="w-32 mb-6" />
        <h1 className="text-yellow-400 font-black text-5xl leading-tight uppercase tracking-tighter">
          Plug In.  Power Up.  Play Hard.
        </h1>
        <p className="mt-4 text-white/80 text-xl font-light tracking-wide border-l-4 border-yellow-400 pl-4">
          Your Ultimate Destination for Gaming Gear
        </p>
      </div>

      {/* Right Side: Register Box */}
      <form 
        onSubmit={handleRegister} 
        className="w-full max-w-[450px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 lg:p-10 flex flex-col"
      >
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
            <p className="text-white/60 text-sm mt-1">Join the elite gaming community today.</p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First Name"
              className="w-1/2 p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
            />
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last Name"
              className="w-1/2 p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
            />
          </div>

          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
          />

          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Create Password"
            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
          />

          <input
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-8 bg-accent border  hover:bg-transparent text-white font-black py-4 rounded-xl shadow-[0_10px_20px_rgba(250,204,21,0.2)] transform hover:-translate-y-1 transition-all duration-300 active:scale-95"
        >
          REGISTER NOW
        </button>

        <p className="text-white/70 text-center mt-6 text-sm">
          Already have an account? 
          <Link to="/login" className="text-yellow-400 font-bold hover:underline ml-2">
            Login Here
          </Link>
        </p>
      </form>
    </div>
  );
}