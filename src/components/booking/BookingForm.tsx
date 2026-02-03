import { useState, useEffect } from 'react';
import { Service } from '../../types';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { Gift, Calendar, MapPin, Calculator, Check } from 'lucide-react';

interface BookingFormProps {
    service: Service;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function BookingForm({ service, onCancel, onSuccess }: BookingFormProps) {
    const { user } = useAuth();
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);

    const [usePoints, setUsePoints] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [finalPrice, setFinalPrice] = useState(service.base_price);

    useEffect(() => {
        if (usePoints && user) {
            // New users 10% starter discount logic or max 30% rule
            // Let's assume 100 points = 10% discount for simplicity in demo
            const potentialDiscount = service.base_price * 0.3; // Max 30%
            const pointValue = (user.points || 0); // 1 point = R1 in this demo context
            const actualDiscount = Math.min(potentialDiscount, pointValue);

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
                location_address: service.requires_location ? address : null,
                scheduled_date: new Date(date).toISOString(),
            });

            if (error) throw error;

            alert(`Booking ${bookingRef} created successfully! Final Price: R${finalPrice}`);
            onSuccess();
        } catch (error) {
            console.error("Booking error:", error);
            alert("Failed to create booking.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold tracking-tighter">CONFIRM <span className="text-red-500 italic">BOOKING</span></h3>
                <div className="bg-gray-800 p-2 rounded-xl border border-gray-700">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Base Rate</p>
                    <p className="text-sm font-bold">R{service.base_price}</p>
                </div>
            </div>

            <div className="bg-red-600/5 border border-red-600/20 p-4 rounded-2xl">
                <p className="text-xs font-bold text-red-500 mb-1">{service.title}</p>
                <p className="text-[10px] text-gray-400 leading-relaxed font-light">{service.description}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                        <Calendar size={12} /> Preferred Schedule
                    </label>
                    <input
                        type="datetime-local"
                        required
                        className="w-full bg-gray-950 border border-gray-800 p-4 rounded-2xl focus:border-red-600 outline-none text-sm"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                {service.requires_location && (
                    <div className="space-y-1 animate-in slide-in-from-top-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                            <MapPin size={12} /> Site Address
                        </label>
                        <textarea
                            required
                            className="w-full bg-gray-950 border border-gray-800 p-4 rounded-2xl focus:border-red-600 outline-none text-sm"
                            placeholder="Enter event/shoot location..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                )}

                {/* Rewards System Section */}
                <div className="bg-gray-950/50 border border-gray-800 rounded-2xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Gift size={16} className="text-yellow-500" />
                            <span className="text-xs font-bold tracking-tight">KMP Points Rewards</span>
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono italic">Bal: {user?.points || 0}</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => setUsePoints(!usePoints)}
                        className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${usePoints
                                ? 'bg-yellow-500/10 border-yellow-500/50'
                                : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                            }`}
                    >
                        <span className="text-[10px] uppercase font-bold tracking-widest">Apply 10% Starter Reward</span>
                        {usePoints ? <Check size={16} className="text-yellow-500" /> : <Calculator size={14} className="text-gray-600" />}
                    </button>

                    {usePoints && (
                        <div className="flex justify-between items-center px-1 animate-in zoom-in-95">
                            <span className="text-[10px] text-green-500 font-bold">- Discount Applied</span>
                            <span className="text-[10px] text-green-500 font-bold font-mono">R{discountAmount.toFixed(2)}</span>
                        </div>
                    )}
                </div>

                {/* Final Price Display */}
                <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-800">
                    <p className="text-sm font-bold tracking-wider uppercase opacity-60">Final Price</p>
                    <p className="text-2xl font-black text-white italic tracking-tighter">R{finalPrice.toFixed(2)}</p>
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-4 rounded-2xl bg-gray-900 hover:bg-gray-850 text-gray-400 text-xs font-bold uppercase tracking-widest border border-gray-800 transition"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-[2] py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest shadow-xl shadow-red-900/30 transition text-xs italic disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Secure Booking'}
                    </button>
                </div>
            </form>
        </div>
    );
}
