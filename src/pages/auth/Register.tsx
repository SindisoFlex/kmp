import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
    const { debugLogin } = useAuth();
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Registration would trigger Supabase Auth here.");
    };

    const handleQuickJoin = () => {
        debugLogin('customer');
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-gray-900 to-red-600"></div>

            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="text-4xl font-bold tracking-tighter">JOIN THE <span className="text-red-600 italic">FUTURE</span></h2>
                    <p className="text-gray-400 mt-2 text-sm">Create your Kasilam Media account today.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Full Name</label>
                        <input type="text" required className="w-full bg-gray-900 border border-gray-800 p-3 rounded-xl focus:border-red-600 outline-none transition" placeholder="John Doe" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Email Address</label>
                        <input type="email" required className="w-full bg-gray-900 border border-gray-800 p-3 rounded-xl focus:border-red-600 outline-none transition" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Password</label>
                        <input type="password" required className="w-full bg-gray-900 border border-gray-800 p-3 rounded-xl focus:border-red-600 outline-none transition" placeholder="••••••••" />
                    </div>

                    <button type="submit" className="w-full bg-red-600 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-red-700 transition shadow-lg shadow-red-900/20 text-sm">
                        Create Account
                    </button>

                    <div className="relative py-4 flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800"></div></div>
                        <span className="relative bg-gray-950 px-4 text-[10px] text-gray-500 uppercase tracking-widest font-bold">or</span>
                    </div>

                    <p className="text-center text-xs text-gray-400">
                        Already have an account? <Link to="/login" className="text-red-500 font-bold">Sign In</Link>
                    </p>

                    <button type="button" onClick={handleQuickJoin} className="w-full border border-gray-800 py-3 rounded-xl text-xs hover:bg-gray-900 transition font-bold tracking-wide italic">
                        (Dev) Quick Social Join
                    </button>

                    <p className="text-[10px] text-center text-gray-600 pt-4 leading-relaxed">
                        By registering, you agree to receive a 10% starter discount points.
                    </p>
                </form>
            </div>
        </div>
    );
}

import { Link } from 'react-router-dom';
