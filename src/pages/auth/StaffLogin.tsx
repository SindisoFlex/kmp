import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface StaffLoginProps {
    portalRole: UserRole;
}

export default function StaffLogin({ portalRole }: StaffLoginProps) {
    const { debugLogin } = useAuth();
    const navigate = useNavigate();

    const portalNames = {
        staff: 'Staff Portal',
        freelancer: 'Freelancer Network',
        admin: 'Global Admin Console',
        customer: 'Customer Portal'
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Authenticating ${portalRole} credentials against the secure internal table...`);
    };

    const handleTestLogin = () => {
        debugLogin(portalRole);
        if (portalRole === 'admin') navigate('/admin');
        else if (portalRole === 'staff') navigate('/staff');
        else if (portalRole === 'freelancer') navigate('/freelancer');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-6 relative">
            {/* Scanned Background Effect for Portals */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            <div className="z-10 w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl overflow-hidden shadow-red-900/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

                <div className="text-center mb-8">
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-2">Internal Access Only</p>
                    <h2 className="text-3xl font-bold tracking-tighter text-white italic underline decoration-red-600 decoration-4 underline-offset-8">
                        {portalNames[portalRole]}
                    </h2>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold tracking-widest text-gray-500 ml-1">Secure ID</label>
                        <input
                            type="email"
                            className="w-full bg-gray-950 border border-gray-800 p-4 rounded-2xl focus:border-red-600 outline-none transition text-sm text-gray-300"
                            placeholder={`${portalRole}@kmp.internal`}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] uppercase font-bold tracking-widest text-gray-500 ml-1">Access Pass</label>
                        <input
                            type="password"
                            className="w-full bg-gray-950 border border-gray-800 p-4 rounded-2xl focus:border-red-600 outline-none transition text-sm text-gray-300"
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="w-full bg-red-600 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-red-700 transition shadow-xl shadow-red-900/40 text-sm italic">
                        Authorize Access
                    </button>

                    <div className="relative py-4 flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800"></div></div>
                        <span className="relative bg-gray-900 px-4 text-[9px] text-gray-500 uppercase tracking-widest font-bold">Diagnostics</span>
                    </div>

                    <button
                        type="button"
                        onClick={handleTestLogin}
                        className="w-full border border-gray-800 py-3 rounded-2xl text-[10px] hover:bg-gray-850 transition font-bold tracking-[0.2em] text-gray-400 group"
                    >
                        BYPASS AUTH & <span className="text-red-500 group-hover:underline">ENTER DASHBOARD</span>
                    </button>

                    <p className="text-[9px] text-center text-gray-600 pt-4 leading-relaxed font-mono uppercase">
                        Protocol: Secure Socket Layer v4.0 <br />
                        KMP Security Engine 2026.02
                    </p>
                </form>
            </div>
        </div>
    );
}
