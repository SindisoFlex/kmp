import { useState } from 'react';
import { Camera, MapPin, Calendar } from 'lucide-react';

export default function MyBookings() {
    // Demo Bookings as requested
    const [bookings] = useState<any[]>([
        {
            id: 'KMP-AX829',
            service: 'Photography',
            status: 'confirmed',
            date: '2026-02-15T14:00:00',
            type: 'physical',
            location: 'Soweto, Gauteng'
        },
        {
            id: 'KMP-ZV104',
            service: 'AI Training',
            status: 'pending',
            date: '2026-02-20T10:00:00',
            type: 'virtual',
            location: 'Zoom Meeting'
        }
    ]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end">
                <h2 className="text-3xl font-black tracking-tighter italic">MY <span className="text-red-500">BOOKINGS</span></h2>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{bookings.length} ACTIVE ORDERS</p>
            </div>

            <div className="space-y-4">
                {bookings.map((booking) => (
                    <div key={booking.id} className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden group hover:border-red-600/30 transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-gray-950 rounded-2xl flex items-center justify-center border border-gray-800 group-hover:bg-red-600/10 transition-colors">
                                <Camera size={20} className="text-gray-400 group-hover:text-red-500" />
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${booking.status === 'confirmed' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'}`}>
                                {booking.status}
                            </span>
                        </div>

                        <div className="space-y-1 mb-6">
                            <h3 className="text-xl font-black tracking-tight uppercase">{booking.service}</h3>
                            <p className="text-[10px] font-mono text-gray-600">REF: {booking.id}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800 border-dashed">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Calendar size={12} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Schedule</span>
                                </div>
                                <p className="text-xs font-bold">{new Date(booking.date).toLocaleDateString()} @ {new Date(booking.date).getHours()}:00</p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <MapPin size={12} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Location</span>
                                </div>
                                <p className="text-xs font-bold truncate">{booking.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State / Loading simulation */}
            <p className="text-center text-[9px] font-bold text-gray-600 uppercase tracking-[0.3em] pt-10">
                Secure Cloud Sync Active
            </p>
        </div>
    );
}
