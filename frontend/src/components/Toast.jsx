import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Info } from "lucide-react";

export default function Toast({ message, type }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        const timer = setTimeout(() => setShow(false), 3000);
        return () => clearTimeout(timer);
    }, [message]);

    const bg =
        type === "success"
            ? "bg-green-500"
            : type === "error"
                ? "bg-red-500"
                : "bg-gray-700";

    const Icon =
        type === "success" ? CheckCircle : type === "error" ? XCircle : Info;

    return (
        <div
            className={`fixed bottom-5 right-5 transform transition-all duration-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
        >
            <div
                className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white ${bg} min-w-[200px]`}
            >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{message}</span>
            </div>
        </div>
    );
}
