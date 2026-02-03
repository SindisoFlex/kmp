import { useAuth } from '../../context/AuthContext';

export default function StaffDashboard() {
    const { signOut } = useAuth();
    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-red-500">Staff Portal</h1>
                <button onClick={() => signOut()} className="text-sm bg-gray-800 px-4 py-2 rounded">Sign Out</button>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Operational Overview</h2>
                <p className="text-gray-400">Manage daily operations and schedules here.</p>
            </div>
        </div>
    );
}
