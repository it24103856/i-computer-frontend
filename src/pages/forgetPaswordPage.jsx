import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate මෙතනටයි අයිති
import toast from "react-hot-toast";
import axios from "axios";

export default function ForgetPasswordPage() {
    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function sendOtp(e) {
        e.preventDefault();
        try {
            setLoading(true);
            // URL එකේ /api/ කොටස index.js එකේ තිබුණ නිසා මෙතනටත් ඒක එකතු කළා
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/send-otp/" + email);
            toast.success("OTP sent to your email!");
            setOtpSent(true);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send OTP.");
        } finally {
            setLoading(false);
        }
    }

    async function resetPassword(e) {
        e.preventDefault();
        if(newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        try {

            setLoading(true);
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/validate-otp", {
                email: email,
                otp: otp,
                newPassword: newPassword,
                confirmPassword: confirmPassword,
            });
            toast.success("Password changed successfully!");
            setLoading(false);
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Reset failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            {!otpSent ? (
                <form onSubmit={sendOtp} className="bg-white p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-4 text-center">Forget Password</h2>
                    <input 
                        className="w-full p-2 border mb-4 rounded" 
                        type="email" placeholder="Email" value={email} 
                        onChange={(e) => setEmail(e.target.value)} required 
                    />
                    <button disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded">
                        {loading ? "Sending..." : "Send OTP"}
                    </button>
                </form>
            ) : (
                <form onSubmit={resetPassword} className="bg-white p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
                    <input 
                        className="w-full p-2 border mb-2 rounded" 
                        type="text" placeholder="Enter OTP" value={otp} 
                        onChange={(e) => setOtp(e.target.value)} required 
                    />
                    <input 
                        className="w-full p-2 border mb-4 rounded" 
                        type="password" placeholder="New Password" value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} required 
                    />
                    <input 
                        className="w-full p-2 border mb-4 rounded" 
                        type="password" placeholder="Confirm Password" value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} required 
                    />
                    <button disabled={loading} className="w-full bg-green-500 text-white py-2 rounded">
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            )}
        </div>
    );
}