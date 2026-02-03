import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, Users, Settings, Database, Server, RefreshCw, BarChart3, LogOut } from 'lucide-react';
import BookingManager from './BookingManager';

export default function AdminDashboard() {
    const { signOut, user } = useAuth();

    return (
        <div className="bg-gray-950 min-h-screen text-white flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-black border-r border-red-900/30 p-6 flex flex-col justify-between">
                <div className="space-y-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-black shadow-lg shadow-red-900/40">K</div>
                        <div>
                            <h2 className="text-sm font-bold tracking-tighter uppercase italic">ADMIN CORE</h2>
                            <p className="text-[8px] text-red-500 uppercase tracking-widest font-black">Level 5 Clearance</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        <button className="w-full flex items-center gap-3 p-4 bg-red-600 text-white rounded-2xl text-xs font-bold shadow-xl shadow-red-900/20">
                            <Server size={18} /> System Core
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 text-gray-500 hover:text-white rounded-2xl text-xs font-bold transition">
                            <Users size={18} /> User Control
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 text-gray-500 hover:text-white rounded-2xl text-xs font-bold transition">
                            <BarChart3 size={18} /> Analytics
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 text-gray-500 hover:text-white rounded-2xl text-xs font-bold transition">
                            <Database size={18} /> DB Storage
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 text-gray-500 hover:text-white rounded-2xl text-xs font-bold transition">
                            <Settings size={18} /> Global Config
                        </button>
                    </nav>
                </div>

                <div className="space-y-4">
                    <div className="bg-red-950/20 border border-red-900/50 p-4 rounded-2xl">
                        <p className="text-[8px] font-black text-red-500 uppercase mb-2">Security Status</p>
                        <div className="flex items-center gap-2">
                            <ShieldAlert className="text-red-600 animate-pulse" size={14} />
                            <span className="text-[10px] font-bold text-gray-300">SYSTEM PROTECTED</span>
                        </div>
                    </div>
                    <button onClick={() => signOut()} className="w-full flex items-center justify-center gap-2 p-3 text-gray-600 hover:text-red-500 transition text-[10px] font-black uppercase tracking-[0.2em]">
                        <LogOut size={14} /> LOCK CONSOLE
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 space-y-10 overflow-y-auto">
                <header className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-gray-900 pb-10">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter leading-none mb-2">SYSTEM <span className="text-red-600">OVERRIDE</span></h1>
                        <p className="text-gray-500 text-sm font-mono tracking-wider">Root access granted to {user?.full_name}</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-gray-900 border border-gray-800 p-4 rounded-2xl flex items-center gap-3 hover:border-red-600 transition group">
                            <RefreshCw size={20} className="text-red-600 group-hover:rotate-180 transition-transform duration-700" />
                            <div className="text-left">
                                <p className="text-[9px] text-gray-500 font-black uppercase">Cache Sync</p>
                                <p className="text-xs font-bold">100% HEALTHY</p>
                            </div>
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-10">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-[2rem] p-8 space-y-8 relative overflow-hidden backdrop-blur-xl">
                        <div className="absolute top-0 right-0 p-8">
                            <Server className="text-red-600/5 stroke-1" size={120} />
                        </div>
                        <div className="flex justify-between items-center relative z-10">
                            <div>
                                <h3 className="text-xl font-bold tracking-tight mb-1">GLOBAL BOOKINGS</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-black">All Role Activity</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="w-3 h-3 bg-red-600 rounded-full animate-ping"></span>
                                <span className="text-[10px] font-bold text-red-500">LIVE MONITORING</span>
                            </div>
                        </div>
                        <div className="relative z-10">
                            <BookingManager />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
