import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import Loader from "../components/Loader";

export default function MySessions() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchSessions = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get("/sessions/my-sessions");
            setSessions(res.data);
        } catch (err) {
            console.error("Failed to fetch sessions:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchSessions();
        setRefreshing(false);
    };

    if (loading) return <Loader />;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">My Sessions</h2>
                <div className="flex gap-3">
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-sm transition"
                    >
                        {refreshing ? "Refreshing..." : "Refresh"}
                    </button>
                    <Link
                        to="/editor"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all"
                    >
                        + New Session
                    </Link>
                </div>
            </div>

            {sessions.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                    <p className="text-xl mb-2">No sessions yet</p>
                    <p className="text-sm">
                        Click{" "}
                        <span className="font-semibold text-blue-600">+ New Session</span>{" "}
                        to create your first one.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {sessions.map((s) => (
                        <Link
                            key={s._id}
                            to={`/editor/${s._id}`}
                            className="group p-5 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-400 transition-all bg-white flex flex-col justify-between"
                        >
                            {/* Title */}
                            <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate group-hover:text-blue-600">
                                {s.title || "Untitled Session"}
                            </h3>

                            {/* Status Badge */}
                            <span
                                className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 ${s.status === "published"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {s.status.toUpperCase()}
                            </span>

                            {/* Tags */}
                            {s.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {s.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* JSON File URL */}
                            <p className="text-xs text-gray-500 truncate break-all">
                                {s.json_file_url || "No JSON file attached"}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
