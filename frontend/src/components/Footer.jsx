import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-12">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-lg font-bold text-blue-400">
                    Wellness Hub
                </div>

                {/* Links */}
                <div className="flex gap-4">
                    <Link to="/" className="hover:text-blue-400 transition-colors">
                        Home
                    </Link>
                    <Link to="/dashboard" className="hover:text-blue-400 transition-colors">
                        Dashboard
                    </Link>
                    <Link to="/my-sessions" className="hover:text-blue-400 transition-colors">
                        My Sessions
                    </Link>
                </div>

                <div className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Wellness Hub. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
