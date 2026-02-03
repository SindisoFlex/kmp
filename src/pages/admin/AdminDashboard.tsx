import { useAuth } from '../../context/AuthContext';
import BookingManager from './BookingManager';

export default function AdminDashboard() {
    const { signOut } = useAuth();
    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-red-500">Admin Dashboard</h1>
                <button onClick={() => signOut()} className="text-sm bg-gray-800 px-4 py-2 rounded">Sign Out</button>
            </div>
            <div className="grid grid-cols-1 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">System Overview</h3>
                    <p className="text-gray-400 mb-4">Manage users, settings, and global logs.</p>
                    <div className="flex gap-4 text-sm font-mono">
                        <div className="bg-gray-700 px-3 py-2 rounded">Active Users: 124</div>
                        <div className="bg-gray-700 px-3 py-2 rounded">Pending Bookings: 3</div>
                    </div>
                </div>

                <BookingManager />
            </div>
        </div>
    );
}
