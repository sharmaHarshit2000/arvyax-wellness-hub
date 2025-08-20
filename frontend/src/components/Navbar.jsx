import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);

    const buttonClass = "w-full text-center px-4 py-2 rounded-lg font-medium transition-colors";

    return (
        <nav className="bg-gray-900 text-white shadow-md px-6 py-3">
            <div className="flex justify-between items-center">
                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-400 hover:text-blue-500 transition-colors"
                >
                    Wellness Hub
                </Link>

                {/* Hamburger Menu for Mobile */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-4 items-center">
                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/my-sessions"
                                className="px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                            >
                                My Sessions
                            </Link>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 transition-colors"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden mt-3 flex flex-col gap-3 bg-gray-800 p-4 rounded-lg shadow-lg">
                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                className={`${buttonClass} bg-gray-700 hover:bg-gray-600`}
                                onClick={() => setOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/my-sessions"
                                className={`${buttonClass} bg-gray-700 hover:bg-gray-600`}
                                onClick={() => setOpen(false)}
                            >
                                My Sessions
                            </Link>
                            <button
                                onClick={() => {
                                    logout();
                                    setOpen(false);
                                }}
                                className={`${buttonClass} bg-red-500 hover:bg-red-600 text-white`}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className={`${buttonClass} bg-blue-600 hover:bg-blue-700 text-white`}
                                onClick={() => setOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className={`${buttonClass} bg-green-600 hover:bg-green-700 text-white`}
                                onClick={() => setOpen(false)}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
