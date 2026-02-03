import { useAuth } from '../../../context/AuthContext';
import { Gift, Wallet, Clock, ShieldCheck, LogOut, ChevronRight } from 'lucide-react';

export default function Profile() {
    const { user, signOut } = useAuth();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex justify-between items-end">
                <h2 className="text-3xl font-black tracking-tighter italic uppercase">Member <span className="text-red-500">Node</span></h2>
                <button onClick={() => signOut()} className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-red-500 flex items-center gap-2">
                    Disconnect <LogOut size={12} />
                </button>
            </div>

            {/* Profile Core Component */}
            <div className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

                <div className="flex items-center gap-6 mb-10">
                    <div className="w-20 h-20 bg-gray-950 rounded-[2rem] flex items-center justify-center text-3xl font-black italic border border-gray-800 text-red-600 shadow-xl">
                        {user?.full_name?.[0]}
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-2xl font-black tracking-tighter uppercase">{user?.full_name}</h2>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{user?.email}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-950 p-6 rounded-3xl border border-gray-800 group hover:border-red-600 transition-colors">
                        <p className="text-[9px] text-gray-600 uppercase font-black tracking-[0.2em] mb-3">Rewards Hub</p>
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-black text-white italic tracking-tighter">{user?.points} T</span>
                            <div className="bg-red-600/10 p-1.5 rounded-lg border border-red-600/30">
                                <Gift size={16} className="text-red-500" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-950 p-6 rounded-3xl border border-gray-800">
                        <p className="text-[9px] text-gray-600 uppercase font-black tracking-[0.2em] mb-3">Clearance</p>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-white uppercase tracking-widest">Global Pro</span>
                            <ShieldCheck size={18} className="text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Loyalty Specs */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-[1px] flex-1 bg-gray-900"></div>
                    <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-600">Protocol Details</h3>
                    <div className="h-[1px] flex-1 bg-gray-900"></div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-900/50 border border-gray-800 p-5 rounded-3xl flex items-center gap-5 hover:bg-gray-900 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-gray-950 rounded-2xl flex items-center justify-center border border-gray-800 text-green-500">
                            <Wallet size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-black uppercase tracking-tight text-white mb-0.5">Yield: 1 Token = R10</p>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Calculated on total production spend.</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-700 group-hover:text-red-500 transition-colors" />
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 p-5 rounded-3xl flex items-center gap-5 hover:bg-gray-900 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-gray-950 rounded-2xl flex items-center justify-center border border-gray-800 text-blue-500">
                            <Clock size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-black uppercase tracking-tight text-white mb-0.5">Global Cap: 30%</p>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Maximum loyalty discount per booking.</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-700 group-hover:text-red-500 transition-colors" />
                    </div>
                </div>
            </div>

            <p className="text-center text-[8px] font-black text-gray-800 uppercase tracking-[0.5em] pt-8">
                Kasilam Integrated Security v4.2
            </p>
        </div>
    );
}
