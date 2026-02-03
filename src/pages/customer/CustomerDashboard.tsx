import { useAuth } from '../../context/AuthContext';
import ServiceList from './services/ServiceList';

export default function CustomerDashboard() {
    const { signOut } = useAuth();
    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-red-500">My Bookings</h1>
                <button onClick={() => signOut()} className="text-sm bg-gray-800 px-4 py-2 rounded">Sign Out</button>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-4">Available Services</h3>
                <p className="text-gray-400">Select a service to start a new booking.</p>
                {/* Service List Component Will Go Here */}
                <button className="mt-4 bg-red-600 px-6 py-2 rounded font-bold">Book a Service</button>
            </div>
        </div>
    );
}
