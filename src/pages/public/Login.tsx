import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export default function Login() {
    const { debugLogin } = useAuth();
    const navigate = useNavigate();

    const handleDebugLogin = (role: UserRole) => {
        debugLogin(role);
        // Navigation is handled by the App wrapper or we can force it, 
        // but since AuthContext updates 'user', the RoleBasedRoute might not trigger automatically 
        // if we are already on /login which is public?
        // Actually App.tsx protects dashboard routes, so we just redirect.
        if (role === 'admin') navigate('/admin');
        else if (role === 'stuff') navigate('/staff'); // typo in 'stuff' vs 'staff' logic usually, but here role is 'staff'
        else if (role === 'staff') navigate('/staff');
        else if (role === 'freelancer') navigate('/freelancer');
        else navigate('/dashboard');
    };
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        alert("In a real app, this would trigger Supabase Auth. For now, check the AuthContext mock.");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-red-500">Kasilam Portal</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" className="w-full p-2 rounded bg-gray-700 border border-gray-600" placeholder="user@kasilam.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input type="password" className="w-full p-2 rounded bg-gray-700 border border-gray-600" placeholder="••••••••" />
                    </div>
                    <button type="submit" className="w-full bg-red-600 py-2 rounded font-bold hover:bg-red-700 transition">
                        Sign In (Supabase)
                    </button>

                    <div className="pt-4 border-t border-gray-700">
                        <p className="text-sm text-gray-400 mb-2">Test Drive Mode (No Backend Required):</p>
                        <div className="grid grid-cols-2 gap-2">
                            <button type="button" onClick={() => handleDebugLogin('customer')} className="bg-blue-600 text-xs py-2 rounded hover:bg-blue-700">Login as Customer</button>
                            <button type="button" onClick={() => handleDebugLogin('admin')} className="bg-purple-600 text-xs py-2 rounded hover:bg-purple-700">Login as Admin</button>
                            <button type="button" onClick={() => handleDebugLogin('freelancer')} className="bg-green-600 text-xs py-2 rounded hover:bg-green-700">Login as Freelancer</button>
                            <button type="button" onClick={() => handleDebugLogin('staff')} className="bg-orange-600 text-xs py-2 rounded hover:bg-orange-700">Login as Staff</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
