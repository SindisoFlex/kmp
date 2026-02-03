import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Booking, UserProfile } from '../../types';

export default function BookingManager() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [freelancers, setFreelancers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data: bookingsData } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
            const { data: usersData } = await supabase.from('users').select('*').eq('role', 'freelancer');

            if (bookingsData) setBookings(bookingsData);
            else {
                // Mock data for demo
                setBookings([
                    { id: '101', customer_id: 'c1', service_id: 's1', status: 'pending', scheduled_date: '2025-05-20T10:00:00Z', created_at: '2025-05-01' },
                    { id: '102', customer_id: 'c2', service_id: 's2', status: 'accepted', freelancer_id: 'f1', scheduled_date: '2025-06-15T14:00:00Z', created_at: '2025-05-02' }
                ] as Booking[]);
            }

            if (usersData) setFreelancers(usersData);
            else {
                // Mock freelancers
                setFreelancers([
                    { id: 'f1', full_name: 'John Lens (Camera)', role: 'freelancer', email: 'john@kasilam.com' },
                    { id: 'f2', full_name: 'Sarah Editor (Post)', role: 'freelancer', email: 'sarah@kasilam.com' }
                ]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAssign = async (bookingId: string, freelancerId: string) => {
        // In real app, call Supabase update
        // await supabase.from('bookings').update({ freelancer_id: freelancerId, status: 'accepted' }).eq('id', bookingId);

        // Optimistic update for demo
        setBookings(bookings.map(b => b.id === bookingId ? { ...b, freelancer_id: freelancerId, status: 'accepted' } : b));
        alert(`Booking ${bookingId} assigned to Freelancer ${freelancerId}`);
    };

    if (loading) return <div>Loading Management Console...</div>;

    return (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-white">Booking Management Queue</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                    <thead className="bg-gray-700 text-gray-100 uppercase">
                        <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Assigned To</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-750">
                                <td className="p-3 font-mono text-xs text-gray-500">#{booking.id.slice(0, 6)}</td>
                                <td className="p-3">{new Date(booking.scheduled_date).toLocaleDateString()}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${booking.status === 'pending' ? 'bg-yellow-900 text-yellow-500' :
                                            booking.status === 'accepted' ? 'bg-blue-900 text-blue-500' :
                                                'bg-green-900 text-green-500'
                                        }`}>
                                        {booking.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-3">
                                    {booking.freelancer_id ? (
                                        <span className="text-white">{freelancers.find(f => f.id === booking.freelancer_id)?.full_name || booking.freelancer_id}</span>
                                    ) : (
                                        <span className="text-red-400 italic">Unassigned</span>
                                    )}
                                </td>
                                <td className="p-3">
                                    {booking.status === 'pending' && (
                                        <select
                                            className="bg-gray-900 border border-gray-600 rounded p-1 text-xs"
                                            onChange={(e) => handleAssign(booking.id, e.target.value)}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Assign Freelancer...</option>
                                            {freelancers.map(f => (
                                                <option key={f.id} value={f.id}>{f.full_name}</option>
                                            ))}
                                        </select>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
