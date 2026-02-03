import { useBookings } from '../../../context/BookingContext';
import { useAuth } from '../../../context/AuthContext';
import { Camera, MapPin, Calendar, Video, Monitor, Zap, Globe, Printer, PenTool, Link as LinkIcon } from 'lucide-react';

export default function MyBookings() {
    const { bookings } = useBookings();
    const { user } = useAuth();

    // Filter bookings for the current user
    const userBookings = bookings.filter(b => b.customer_id === user?.id);

    const iconMap: Record<string, any> = {
        'srv-1': Camera,
        'srv-2': Video,
        'srv-3': Monitor,
        'srv-4': Zap,
        'srv-5': PenTool,
        'srv-6': Printer,
        'srv-7': Globe,
    };

    // Helper to get service title for display (Mock logic)
    const getServiceTitle = (id: string) => {
        if (id === 'srv-1') return 'Photography';
        if (id === 'srv-3') return 'Web & App Dev';
        if (id === 'srv-4') return 'AI Training';
        return 'Media Production';
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter italic uppercase">My <span className="text-red-500">Bookings</span></h2>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Production Archive</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-black italic tracking-tighter text-white leading-none">{userBookings.length}</p>
                    <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Active Orders</p>
                </div>
            </div>

            <div className="space-y-6">
                {userBookings.length === 0 ? (
                    <div className="bg-gray-950 border border-gray-900 rounded-[2.5rem] p-12 text-center space-y-4">
                        <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto border border-gray-800">
                            <Calendar size={24} className="text-gray-700" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">No active production deployments</p>
                    </div>
                ) : (
                    userBookings.map((booking) => {
                        const Icon = iconMap[booking.service_id] || Camera;
                        return (
                            <div key={booking.id} className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group hover:border-red-600/30 transition-all active:scale-[0.98]">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-red-600/10 transition-colors"></div>

                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <div className="w-14 h-14 bg-gray-950 rounded-2xl flex items-center justify-center border border-gray-800 group-hover:bg-red-600/10 transition-colors shadow-inner">
                                        <Icon size={24} className="text-gray-500 group-hover:text-red-500 transition-colors" />
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border shadow-sm ${booking.status === 'confirmed' || booking.status === 'accepted'
                                                ? 'bg-green-500/10 border-green-500/30 text-green-500'
                                                : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500 animate-pulse'
                                            }`}>
                                            {booking.status}
                                        </span>
                                        <p className="text-[8px] font-mono text-gray-700 uppercase tracking-widest font-bold">NODE: {booking.id}</p>
                                    </div>
                                </div>

                                <div className="space-y-1 mb-8 relative z-10">
                                    <h3 className="text-2xl font-black tracking-tight uppercase italic">{getServiceTitle(booking.service_id)}</h3>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                                        {booking.meeting_type === 'physical' ? 'Physical Deployment' : 'Virtual Sync'}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-800 border-dashed relative z-10">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar size={12} />
                                            <span className="text-[8px] font-black uppercase tracking-widest">Temporal</span>
                                        </div>
                                        <p className="text-[11px] font-black uppercase tracking-tight text-gray-300">
                                            {new Date(booking.scheduled_date).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            <span className="text-red-600 ml-1">@</span> {new Date(booking.scheduled_date).getHours()}:00
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            {booking.meeting_type === 'physical' ? <MapPin size={12} /> : <LinkIcon size={12} />}
                                            <span className="text-[8px] font-black uppercase tracking-widest">Coordinates</span>
                                        </div>
                                        <p className="text-[11px] font-black uppercase tracking-tight text-gray-300 truncate">
                                            {booking.location_address || booking.virtual_link || 'Link Pending'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <p className="text-center text-[8px] font-black text-gray-800 uppercase tracking-[0.6em] pt-8">
                Production Core v1.0.2 // Encrypted
            </p>
        </div>
    );
}
