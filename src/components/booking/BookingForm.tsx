import { useState, useEffect } from 'react';
import { Service } from '../../types';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Gift, Calendar, MapPin, Calculator, Check, Monitor, Map } from 'lucide-react';

interface BookingFormProps {
    service: Service;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function BookingForm({ service, onCancel, onSuccess }: BookingFormProps) {
    const { user } = useAuth();
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [meetingType, setMeetingType] = useState<'physical' | 'virtual'>('physical');
    const [loading, setLoading] = useState(false);

    const [usePoints, setUsePoints] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [finalPrice, setFinalPrice] = useState(service.base_price);

    useEffect(() => {
        if (usePoints && user) {
            // Max 30% discount rule
            const maxDiscount = service.base_price * 0.3;
            const pointsValue = user.points * 0.1; // 1 token = R10 (Simplified: point translates to value)
            const actualDiscount = Math.min(maxDiscount, pointsValue);

            setDiscountAmount(actualDiscount);
            setFinalPrice(service.base_price - actualDiscount);
        } else {
            setDiscountAmount(0);
            setFinalPrice(service.base_price);
        }
    }, [usePoints, user, service.base_price]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return alert("You must be logged in.");

        setLoading(true);

        try {
            const bookingRef = `KMP-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

            const { error } = await supabase.from('bookings').insert({
                id: bookingRef,
                customer_id: user.id,
                service_id: service.id,
                status: 'pending',
                meeting_type: meetingType,
                location_address: address || null,
                scheduled_date: new Date(date).toISOString(),
            });

            if (error) throw error;

            alert(`Booking ${bookingRef} created successfully! Status: PENDING.`);
            onSuccess();
        } catch (error) {
            console.error("Booking error:", error);
            alert("Failed to create booking.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start">
                <h3 className="text-2xl font-black tracking-tighter italic">RESERVE <span className="text-red-500 uppercase">{service.title}</span></h3>
                <div className="text-right">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1">Base Price</p>
                    <p className="text-xl font-black italic">R{service.base_price}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Meeting Type Selection */}
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Service Delivery Type</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setMeetingType('physical')}
                            className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${meetingType === 'physical' ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/40' : 'bg-gray-950 border-gray-800 text-gray-500'}`}
                        >
                            <Map size={20} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Physical / On-Site</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setMeetingType('virtual')}
                            className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${meetingType === 'virtual' ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/40' : 'bg-gray-950 border-gray-800 text-gray-500'}`}
                        >
                            <Monitor size={20} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Virtual / Call</span>
                        </button>
                    </div>
                </div>

                {/* Date Picker */}
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                        <Calendar size={12} /> Schedule Date & Time
                    </label>
                    <input
                        type="datetime-local"
                        required
                        className="w-full bg-gray-950 border border-gray-800 p-4 rounded-2xl focus:border-red-600 outline-none text-sm transition-colors"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                {/* Optional Location */}
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                        <MapPin size={12} /> Location (Optional)
                    </label>
                    <textarea
                        className="w-full bg-gray-950 border border-gray-800 p-4 rounded-2xl focus:border-red-600 outline-none text-sm transition-colors h-20"
                        placeholder="Enter address if physical meeting..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                {/* Rewards System */}
                <div className="bg-gray-950 border border-gray-800 rounded-3xl p-5 space-y-4 shadow-inner">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Gift size={16} className="text-yellow-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Rewards Program</span>
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono">My Balance: {user?.points} T</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => setUsePoints(!usePoints)}
                        className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all ${usePoints ? 'bg-green-600/10 border-green-600/50' : 'bg-gray-900 border-gray-800 hover:border-gray-700'}`}
                    >
                        <span className="text-[10px] font-bold uppercase tracking-widest">Apply Max Discount (30%)</span>
                        {usePoints ? <Check size={18} className="text-green-500" /> : <Calculator size={16} className="text-gray-600" />}
                    </button>

                    {usePoints && (
                        <div className="flex justify-between items-center px-2 animate-in slide-in-from-right-2">
                            <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest italic">Savings Applied</span>
                            <span className="text-sm font-black text-green-500">- R{discountAmount.toFixed(2)}</span>
                        </div>
                    )}
                </div>

                {/* Final Total */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800 border-dashed">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Order Investment</p>
                    <p className="text-3xl font-black italic tracking-tighter text-white underline decoration-red-600 decoration-4">R{finalPrice.toFixed(2)}</p>
                </div>

                <div className="flex gap-4 pt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-4 rounded-2xl bg-transparent border border-gray-800 text-gray-500 font-black uppercase tracking-widest text-[10px] hover:text-white hover:border-white transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-[2] py-4 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-red-900/30 hover:bg-red-700 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Securing...' : 'Confirm Order'}
                    </button>
                </div>
            </form>
        </div>
    );
}
