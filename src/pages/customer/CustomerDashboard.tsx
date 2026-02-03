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
            <header className="p-4 flex justify-between items-center border-b border-gray-800 bg-gray-900 sticky top-0 z-10">
                <div>
                    <h1 className="text-xl font-bold text-red-600">KMP</h1>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Kasilam Media Production</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-xs font-bold">{user?.full_name}</p>
                        <p className="text-[10px] text-yellow-500">{user?.points || 0} Points</p>
                    </div>
                    <button onClick={() => signOut()} className="text-[10px] bg-gray-800 px-2 py-1 rounded border border-gray-700 hover:bg-red-900 transition font-bold">EXIT</button>
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
