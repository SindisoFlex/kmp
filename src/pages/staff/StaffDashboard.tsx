import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Users, Calendar, MessageCircle, BarChart3, Settings } from 'lucide-react';
import BookingManager from '../admin/BookingManager';

export default function StaffDashboard() {
    const { signOut, user } = useAuth();

    const stats = [
        { label: 'New Bookings', value: '12', color: 'text-red-500' },
        { label: 'Active Jobs', value: '45', color: 'text-blue-500' },
        { label: 'Unassigned', value: '3', color: 'text-yellow-500' },
    ];

    return (
        <div className="bg-gray-950 min-h-screen text-white flex flex-col md:flex-row">
            {/* Sidebar (Desktop) / Top Bar (Mobile) */}
            <aside className="w-full md:w-64 bg-gray-900 border-r border-gray-800 p-6 space-y-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-black">S</div>
                    <div>
                        <h2 className="text-sm font-bold tracking-tighter uppercase italic">Staff Console</h2>
                        <p className="text-[9px] text-gray-500 uppercase tracking-widest leading-none">Management v1.0</p>
                    </div>
                </div>

                <nav className="space-y-1">
                    <button className="w-full flex items-center gap-3 p-3 bg-red-600/10 text-red-500 rounded-xl text-xs font-bold transition border border-red-600/20">
                        <LayoutDashboard size={16} /> Dashboard
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-gray-400 hover:text-white rounded-xl text-xs font-bold transition">
                        <Calendar size={16} /> Bookings
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-gray-400 hover:text-white rounded-xl text-xs font-bold transition">
                        <Users size={16} /> Clients
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 text-gray-400 hover:text-white rounded-xl text-xs font-bold transition">
                        <MessageCircle size={16} /> Dispatch
                    </button>
                </nav>

                <div className="pt-8 mt-8 border-t border-gray-800">
                    <button onClick={() => signOut()} className="w-full flex items-center gap-3 p-3 text-gray-500 hover:text-red-500 rounded-xl text-xs font-bold transition">
                        EXIT PORTAL
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tighter">OPERATIONS <span className="text-red-600 italic">CENTER</span></h1>
                        <p className="text-sm text-gray-400">Welcome, {user?.full_name}. System is healthy.</p>
                    </div>

                    <div className="flex gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-gray-900 border border-gray-800 p-4 rounded-2xl min-w-[120px]">
                                <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest mb-1">{stat.label}</p>
                                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </header>

                <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-850">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Recent Booking Requests</h3>
                        <button className="text-[10px] bg-red-600 px-3 py-1 rounded-full font-bold">BATCH ASSIGN</button>
                    </div>
                    <div className="p-6">
                        <BookingManager />
                    </div>
                </div>
            </main>
        </div>
    );
}
