import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const GoogleLogin=useGoogleLogin({
          flow: "implicit",
          onSuccess:(response)=>{ 
            setIsLoading(true);
            axios.post(import.meta.env.VITE_BACKEND_URL + "/users/google-login", {
              token:response.access_token,
            }).then((res)=>{
              localStorage.setItem("token", res.data.token);

              if (res.data.role === "admin") {
                navigate("/admin");
              } else {
                navigate("/");
              }

              toast.success("Login successful!");
            }).catch((err)=>{
              toast.error("Google Login Failed");
              console.error("Error during Google login:", err);
            }).finally(()=>{setIsLoading(false);});

           },
          onError:()=>{toast.error("Google Login Failed");},
          onNonOAuthError:()=>{toast.error("Google Login Failed");}

  })

 
  async function login(e) {
   
    if (e) {
      e.preventDefault();
      e.stopPropagation(); 
    }

    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
        email,
        password,
      });

      console.log("Response:", res.data);
      localStorage.setItem("token", res.data.token);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast.success("Login successful!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMsg);
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

      {/* 2. මෙතන div එක වෙනුවට form එකක් දාලා onSubmit එකට login function එක දුන්නා */}
      <form onSubmit={login} className="w-[450px] h-[600px] rounded-2xl bg-white/20 backdrop-blur-xl shadow-2xl p-10 flex flex-col justify-center">
        <h1 className="text-[40px] font-bold mb-5 text-white">Login</h1>

        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your Email"
          className="w-full p-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <p className="text-white not-italic w-full mb-[20px] mt-2">
          Forget Password?
          <Link to="/froget-Password" line="forget-password" className="text-yellow-400 hover:underline italic">
            {" "}Click Here
          </Link>
        </p>

        {/* 3. Button type එක submit කළා */}
        <button
          type="submit"
          className="w-full bg-accent text-white font-bold py-4 rounded-lg border border-accent hover:bg-transparent transition-colors"
        >
          Sign In
        </button>
        <button
          onClick={() => GoogleLogin()}
  type="button"
  className="w-full mt-4 bg-white/5 backdrop-blur-md text-white font-semibold py-3.5 rounded-xl border border-white/10 hover:border-white/40 hover:bg-white/10 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group shadow-lg"
>
  <div className="bg-white p-1.5 rounded-lg group-hover:scale-110 transition-transform duration-300">
    
  </div>
  <span className="tracking-wide">Sign In with Google<GrGoogle className="inline ml-2 mb-1"/></span>
</button>

        <p className="text-white not-italic mt-4">
          Don't have an account?
          <Link to="/register" className="text-yellow-400 hover:underline italic">
            {" "}register
          </Link>
        </p>
      </form>
    </div>
  );
}