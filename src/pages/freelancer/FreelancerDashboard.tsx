import { useAuth } from '../../context/AuthContext';
import JobBoard from './JobBoard';

export default function FreelancerDashboard() {
    const { signOut } = useAuth();
    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-red-500">Freelancer Portal</h1>
                <button onClick={() => signOut()} className="text-sm bg-gray-800 px-4 py-2 rounded">Sign Out</button>
            </div>
            <JobBoard />
        </div>
    );
}
