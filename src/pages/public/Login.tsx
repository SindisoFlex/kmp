import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Sparkles, ArrowRight, ShieldCheck, Terminal, Zap } from 'lucide-react';

export default function Login() {
    const { debugLogin } = useAuth();
    const navigate = useNavigate();

    const handleDebugLogin = (role: UserRole) => {
        debugLogin(role);
        if (role === 'admin') navigate('/admin');
        else if (role === 'staff') navigate('/staff');
        else if (role === 'freelancer') navigate('/freelancer');
        else navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-6 overflow-hidden relative">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-700">
                {/* Logo Area */}
                <div className="text-center mb-10 space-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-2xl mb-4 shadow-2xl shadow-red-900/40 transform -rotate-6">
                        <Zap size={32} className="text-white fill-white" />
                    </div>
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
                        Kasilam <span className="text-red-600">Portal</span>
                    </h1>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Media Production Hub v1.0</p>
                </div>

                {/* Glass Card */}
                <div className="bg-gray-900/40 backdrop-blur-2xl border border-gray-800 rounded-[2.5rem] p-10 shadow-3xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

                    <div className="space-y-6">
                        <div className="bg-gray-950 p-6 rounded-3xl border border-gray-800 hover:border-red-600 transition-all cursor-pointer group/btn" onClick={() => handleDebugLogin('customer')}>
                            <div className="flex justify-between items-center mb-4">
                                <div className="w-10 h-10 bg-red-600/10 rounded-xl flex items-center justify-center border border-red-600/30 group-hover/btn:bg-red-600 group-hover/btn:text-white transition-colors">
                                    <Sparkles size={20} className="text-red-500 group-hover/btn:text-white" />
                                </div>
                                <ArrowRight size={18} className="text-gray-700 group-hover/btn:text-red-500 transform group-hover/btn:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-tight italic">Secure Client Access</h3>
                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">Continue to production dashboard, bookings, and cultural media vault.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] ml-2 mt-4">Internal Subsystems</p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleDebugLogin('staff')}
                                    className="flex-1 bg-gray-950 border border-gray-800 py-4 rounded-2xl flex flex-col items-center justify-center gap-2 group/sub hover:border-gray-600 transition-all"
                                >
                                    <ShieldCheck size={18} className="text-gray-700 group-hover/sub:text-blue-500" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Ops / Staff</span>
                                </button>

                                <button
                                    onClick={() => handleDebugLogin('admin')}
                                    className="flex-1 bg-gray-950 border border-gray-800 py-4 rounded-2xl flex flex-col items-center justify-center gap-2 group/sub hover:border-gray-600 transition-all"
                                >
                                    <Terminal size={18} className="text-gray-700 group-hover/sub:text-red-600" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">System Admin</span>
                                </button>
                            </div>
                        </div>

                        <p className="text-center text-[8px] font-bold text-gray-750 uppercase tracking-[0.3em] pt-6">
                            Encrypted Production Protocol Active
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em]">© 2026 Kasilam Media Production</p>
                </div>
            </div>
        </div>
    );
}
