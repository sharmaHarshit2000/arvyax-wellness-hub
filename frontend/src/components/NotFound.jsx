import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4 text-center">
            <h1 className="text-6xl font-extrabold text-gray-800 mb-4 animate-pulse">
                404
            </h1>

            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Oops! Page Not Found
            </h2>
            <p className="text-gray-500 mb-6">
                The page you are looking for doesn't exist or has been moved.
            </p>

            <Link
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all transform hover:-translate-y-1 hover:scale-105"
            >
                Go to Home
            </Link>
        </div>
    );
}

export default NotFound;
