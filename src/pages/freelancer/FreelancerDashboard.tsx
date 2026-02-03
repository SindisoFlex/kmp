import { useAuth } from '../../context/AuthContext';
import { Briefcase, CheckCircle2, MessageSquare, Clock, TrendingUp, LogOut } from 'lucide-react';
import JobBoard from './JobBoard';

export default function FreelancerDashboard() {
    const { signOut, user } = useAuth();

    const stats = [
        { label: 'Completed', value: '28', icon: CheckCircle2, color: 'text-green-500' },
        { label: 'Upcoming', value: '4', icon: Clock, color: 'text-blue-500' },
        { label: 'Earnings', value: 'R12.5k', icon: TrendingUp, color: 'text-red-500' },
    ];

    return (
        <div className="bg-gray-950 min-h-screen text-white flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col justify-between">
                <div className="space-y-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center font-black italic">F</div>
                        <div>
                            <h2 className="text-sm font-bold tracking-tighter uppercase">Freelancer</h2>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">ID: {user?.id.substring(0, 8)}</p>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        <button className="w-full flex items-center gap-3 p-3 bg-red-600/10 text-red-500 rounded-2xl text-xs font-bold border border-red-600/20">
                            <Briefcase size={16} /> Job Board
                        </button>
                        <button className="w-full flex items-center gap-3 p-3 text-gray-400 hover:text-white rounded-2xl text-xs font-bold transition">
                            <MessageSquare size={16} /> Messages
                        </button>
                    </nav>
                </div>

                <button onClick={() => signOut()} className="flex items-center gap-3 p-3 text-gray-600 hover:text-red-500 transition text-xs font-bold uppercase tracking-widest">
                    <LogOut size={16} /> Disconnect
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 space-y-10 overflow-y-auto">
                <header className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold tracking-tighter">NETWORK <span className="text-red-600 italic">PORTAL</span></h1>
                        <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Available</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-6 rounded-3xl relative overflow-hidden group hover:border-red-600/30 transition shadow-xl">
                                <stat.icon className={`absolute -right-4 -bottom-4 w-20 h-20 opacity-5 group-hover:scale-110 transition ${stat.color}`} />
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">{stat.label}</p>
                                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </header>

                <div className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 space-y-6 shadow-2xl">
                    <div className="flex justify-between items-center px-2">
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 italic">Job Assignments</h3>
                        <div className="h-[1px] flex-1 bg-gray-800 mx-6"></div>
                        <p className="text-[10px] text-gray-400 font-mono">Last updated: Just now</p>
                    </div>
                    <JobBoard />
                </div>
            </main>
        </div>
    );
}
