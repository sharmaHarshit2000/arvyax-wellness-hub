export default function Loader({ message = "Loading..." }) {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-500 border-b-transparent"></div>
            <p className="mt-4 text-gray-700 text-lg font-medium">{message}</p>
        </div>
    );
}
