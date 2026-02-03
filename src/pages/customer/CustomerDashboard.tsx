import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, ClipboardList, Image, MessageSquare, User } from 'lucide-react';

export default function CustomerDashboard() {
    const { signOut, user } = useAuth();
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Book', path: '/dashboard' },
        { icon: ClipboardList, label: 'Bookings', path: '/dashboard/bookings' },
        { icon: Image, label: 'Gallery', path: '/dashboard/gallery' },
        { icon: MessageSquare, label: 'Inbox', path: '/dashboard/messages' },
        { icon: User, label: 'Profile', path: '/dashboard/profile' },
    ];

    const isActive = (path: string) => {
        if (path === '/dashboard') return location.pathname === '/dashboard' || location.pathname === '/dashboard/book';
        return location.pathname === path;
    };

    return (
        <div className="bg-gray-950 min-h-screen text-white pb-24">
            {/* Header */}
            <header className="p-6 flex justify-between items-center border-b border-gray-900 bg-black/90 backdrop-blur-3xl sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black italic text-lg shadow-lg shadow-red-900/40">K</div>
                    <div>
                        <h1 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Antigravity Hub</h1>
                        <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest">{user?.full_name?.split(' ')[0]}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-900/50 px-4 py-2 rounded-2xl border border-gray-800">
                    <span className="text-[10px] font-mono font-black text-red-500 italic">{user?.points || 0} T</span>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                </div>
            </header>

            {/* Content Area */}
            <main className="p-4 max-w-lg mx-auto">
                <Outlet />
            </main>

            {/* Mobile Bottom Navigation (Glassmorphism) */}
            <nav className="fixed bottom-0 left-0 right-0 p-4 z-50">
                <div className="max-w-md mx-auto bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl flex justify-around items-center p-2 shadow-2xl">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center gap-1 p-2 transition-all duration-300 rounded-xl ${isActive(item.path) ? 'text-red-500 scale-110' : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} strokeWidth={isActive(item.path) ? 2.5 : 2} />
                            <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
}
