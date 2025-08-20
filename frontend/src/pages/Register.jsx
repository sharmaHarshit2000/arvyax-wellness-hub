import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function Register() {
    const { register } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }
        setError("");

        const success = await register(form.email, form.password);
        if (success) navigate("/login");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 shadow-xl rounded-2xl w-96 space-y-6 border"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Create Account
                </h2>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-200"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </div>

                {/* Password with toggle */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className={`w-full border px-3 py-2 rounded-lg focus:ring pr-10 ${error ? "border-red-500 focus:ring-red-200" : "focus:ring-blue-200"
                                }`}
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
                >
                    Register
                </button>

                {/* Nav Links */}
                <p className="text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Login here
                    </Link>
                </p>
            </form>
        </div>
    );
}
