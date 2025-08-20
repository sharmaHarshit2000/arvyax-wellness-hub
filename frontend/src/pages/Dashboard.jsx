import { useEffect, useState } from "react";
import api from "../api/api";
import Loader from "../components/Loader";

export default function Dashboard() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/sessions")
            .then((res) => setSessions(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                Published Sessions
            </h2>

            {sessions.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                    <p className="text-2xl font-semibold mb-2">No sessions published yet</p>
                    <p className="text-sm">
                        Once you or others publish sessions, they will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {sessions.map((s) => (
                        <div
                            key={s._id}
                            className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-200 flex flex-col justify-between"
                        >
                            {/* Title */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 truncate">
                                {s.title || "Untitled Session"}
                            </h3>

                            {/* Tags */}
                            {s.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {s.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* JSON URL */}
                            <a
                                href={s.json_file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 font-semibold mt-auto"
                            >
                                View JSON
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
