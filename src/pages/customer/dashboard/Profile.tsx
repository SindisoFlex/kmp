import { useAuth } from '../../../context/AuthContext';
import { Gift, Wallet, Award, Clock } from 'lucide-react';

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            {/* User Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-950 p-6 rounded-3xl border border-gray-700 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full -mr-10 -mt-10 blur-3xl"></div>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-2xl font-bold italic">
                        {user?.full_name?.[0]}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">{user?.full_name}</h2>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900/50 p-4 rounded-2xl border border-gray-800">
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Available Points</p>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-yellow-500">{user?.points || 150}</span>
                            <Gift size={16} className="text-yellow-600" />
                        </div>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-2xl border border-gray-800">
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Status</p>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-red-500 uppercase tracking-tighter">Pro Member</span>
                            <Award size={16} className="text-red-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Rewards & Policies */}
            <div className="space-y-4">
                <h3 className="text-xs uppercase font-bold tracking-widest text-gray-500 border-l-2 border-red-600 pl-2">Reward Benefits</h3>

                <div className="grid grid-cols-1 gap-3">
                    <div className="bg-gray-900 p-4 rounded-2xl flex items-center gap-4 border border-gray-800">
                        <div className="bg-gray-850 p-2 rounded-lg"><Wallet className="text-green-500" size={18} /></div>
                        <div>
                            <p className="text-xs font-bold">1 Token = R10 Spent</p>
                            <p className="text-[10px] text-gray-500">Earn tokens on every booking.</p>
                        </div>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-2xl flex items-center gap-4 border border-gray-800 opacity-60">
                        <div className="bg-gray-850 p-2 rounded-lg"><Clock className="text-blue-500" size={18} /></div>
                        <div>
                            <p className="text-xs font-bold">Saving for 30% Discount</p>
                            <p className="text-[10px] text-gray-500">Redeem points once you hit 500 tokens.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
