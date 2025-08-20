import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loader message="Checking authentication..." />;
    }

    return user ? children : <Navigate to="/login" replace />;
}
