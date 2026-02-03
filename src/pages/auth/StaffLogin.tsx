import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function StaffLogin() {
    const { debugLogin } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        alert("This would authenticate against the staff/admin user table.");
    };

    const handleTestLogin = (role: 'admin' | 'staff' | 'freelancer') => {
        debugLogin(role);
        if (role === 'admin') navigate('/admin');
        else if (role === 'staff') navigate('/staff');
        else if (role === 'freelancer') navigate('/freelancer');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white border-t-4 border-red-600">
            <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-800">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Internal Portal</h2>
                    <p className="text-gray-400 text-sm">Authorized Personnel Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Staff ID / Email</label>
                        <input type="email" className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition" placeholder="admin@kasilam.com" />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Password</label>
                        <input type="password" className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition" placeholder="••••••••" />
                    </div>
                    <button type="submit" className="w-full bg-red-600 py-3 rounded font-bold hover:bg-red-700 transition shadow-lg shadow-red-900/20">
                        Access Dashboard
                    </button>

                    <div className="pt-6 mt-6 border-t border-gray-800">
                        <p className="text-xs text-center text-gray-500 mb-4">Internal Testing Access</p>
                        <div className="grid grid-cols-1 gap-3">
                            <button type="button" onClick={() => handleTestLogin('admin')} className="w-full py-2 rounded border border-gray-700 hover:bg-gray-800 text-xs text-gray-300">Login as Admin</button>
                            <button type="button" onClick={() => handleTestLogin('staff')} className="w-full py-2 rounded border border-gray-700 hover:bg-gray-800 text-xs text-gray-300">Login as Staff</button>
                            <button type="button" onClick={() => handleTestLogin('freelancer')} className="w-full py-2 rounded border border-gray-700 hover:bg-gray-800 text-xs text-gray-300">Login as Freelancer</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
