import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Booking } from '../../types';
import { useAuth } from '../../context/AuthContext';

export default function JobBoard() {
    const { user } = useAuth();
    const [jobs, setJobs] = useState<Booking[]>([]);

    useEffect(() => {
        // In real app, fetch bookings where freelancer_id == user.id
        // Mocking for now
        setJobs([
            { id: '102', customer_id: 'c2', service_id: 's2', status: 'accepted', freelancer_id: user?.id, scheduled_date: '2025-06-15T14:00:00Z', created_at: '2025-05-02' }
        ] as Booking[]);
    }, [user]);

    const updateStatus = (bookingId: string, newStatus: Booking['status']) => {
        setJobs(jobs.map(j => j.id === bookingId ? { ...j, status: newStatus } : j));
        alert(`Job status updated to ${newStatus}`);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-white">My Assigned Jobs</h3>
            <div className="space-y-4">
                {jobs.length === 0 ? <p className="text-gray-500">No active jobs assigned.</p> : jobs.map(job => (
                    <div key={job.id} className="bg-gray-700 p-4 rounded flex justify-between items-center">
                        <div>
                            <p className="font-bold text-white">Booking #{job.id}</p>
                            <p className="text-sm text-gray-400">Date: {new Date(job.scheduled_date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                            {job.status === 'accepted' && (
                                <button onClick={() => updateStatus(job.id, 'in_progress')} className="px-3 py-1 bg-blue-600 rounded text-xs hover:bg-blue-700">Start Job</button>
                            )}
                            {job.status === 'in_progress' && (
                                <button onClick={() => updateStatus(job.id, 'completed')} className="px-3 py-1 bg-green-600 rounded text-xs hover:bg-green-700">Complete Job</button>
                            )}
                            {job.status === 'completed' && <span className="text-green-500 font-bold text-sm">✓ Completed</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
