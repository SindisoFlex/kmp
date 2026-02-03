import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Booking } from '../../../types';
import { useAuth } from '../../../context/AuthContext';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function MyBookings() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        // In demo, we just show some mock bookings if none in DB
        setBookings([
            { id: 'BK-001', service_id: 'Photography', status: 'pending', scheduled_date: '2025-06-15T10:00:00Z', created_at: '2025-02-01' },
            { id: 'BK-002', service_id: 'Web Dev', status: 'accepted', scheduled_date: '2025-07-20T14:00:00Z', created_at: '2025-02-02' }
        ] as any);
    }, [user]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="text-yellow-500" size={16} />;
            case 'accepted': return <CheckCircle2 className="text-blue-500" size={16} />;
            case 'completed': return <CheckCircle2 className="text-green-500" size={16} />;
            default: return <AlertCircle className="text-gray-500" size={16} />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-red-600/10 border border-red-500/20 p-4 rounded-2xl flex items-center justify-between">
                <p className="text-[10px] uppercase font-bold tracking-widest text-red-500">Booking Status</p>
                <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {bookings.map((booking) => (
                    <div key={booking.id} className="bg-gray-900 p-5 rounded-3xl border border-gray-800 hover:border-gray-700 transition">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{booking.id}</p>
                                <h3 className="text-lg font-bold tracking-tight">{booking.service_id}</h3>
                            </div>
                            <div className="bg-gray-850 p-2 rounded-xl">
                                {getStatusIcon(booking.status)}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-400">
                            <div className="flex items-center gap-1">📍 <span>On-Site</span></div>
                            <div className="flex items-center gap-1">📅 <span>{new Date(booking.scheduled_date).toLocaleDateString()}</span></div>
                        </div>

                        <div className="mt-6 flex gap-2">
                            <button className="flex-1 bg-gray-850 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition">Details</button>
                            <button className="flex-1 bg-red-600/10 text-red-500 border border-red-500/20 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-600/20 transition">Help</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
