import { createContext, useState, useEffect } from "react";
import api from "../api/api";
import Loader from "../components/Loader";
import Toast from "../components/Toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);

    const showToast = (msg, type) => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const getMe = async () => {
        try {
            const res = await api.get("/auth/me");
            setUser(res.data);
        } catch {
            localStorage.removeItem("token");
            setUser(null);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            await getMe();
            showToast("Login successful", "success");
            return true;
        } catch (err) {
            showToast(err.response?.data?.message || "Login failed", "error");
            return false;
        }
    };

    const register = async (email, password) => {
        try {
            await api.post("/auth/register", { email, password });
            showToast("Registration successful. Please login.", "success");
            return true;
        } catch (err) {
            showToast(err.response?.data?.message || "Register failed", "error");
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        showToast("Logged out", "success");
    };

    useEffect(() => {
        const init = async () => {
            if (localStorage.getItem("token")) await getMe();
            setLoading(false);
        };
        init();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, getMe, showToast }}>
            {loading ? <Loader /> : children}
            {toast && <Toast message={toast.msg} type={toast.type} />}
        </AuthContext.Provider>
    );
};
