import { useState, useEffect } from 'react';
import { Service } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useBookings } from '../../context/BookingContext';
import { Gift, Calendar, MapPin, Calculator, Check, Monitor, Map, Navigation, Clock, ChevronDown, Sparkles, ChevronUp } from 'lucide-react';

interface BookingFormProps {
    service: Service;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function BookingForm({ service, onCancel, onSuccess }: BookingFormProps) {
    const { user, updatePoints } = useAuth();
    const { addBooking } = useBookings();

    // Form State
    const [address, setAddress] = useState('');
    const [meetingType, setMeetingType] = useState<'physical' | 'virtual'>('physical');
    const [loading, setLoading] = useState(false);
    const [isDetecting, setIsDetecting] = useState(false);

    // Advanced Date/Time State
    const [day, setDay] = useState(new Date().getDate());
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [hour, setHour] = useState(10);
    const [minute, setMinute] = useState(0);
    const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

    // Rewards State
    const [usePoints, setUsePoints] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [finalPrice, setFinalPrice] = useState(service.base_price);

    useEffect(() => {
        if (usePoints && user) {
            const maxDiscount = service.base_price * 0.3;
            const pointsValue = user.points * 0.1; // 1 token = R10
            const actualDiscount = Math.min(maxDiscount, pointsValue);
            setDiscountAmount(actualDiscount);
            setFinalPrice(service.base_price - actualDiscount);
        } else {
            setDiscountAmount(0);
            setFinalPrice(service.base_price);
        }
    }, [usePoints, user, service.base_price]);

    const handleGPS = () => {
        setIsDetecting(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setAddress(`GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)} (Current Location)`);
                setIsDetecting(false);
            }, () => {
                alert("Location access denied.");
                setIsDetecting(false);
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setLoading(true);

        const scheduledDate = new Date(year, month, day, period === 'PM' ? hour + 12 : hour, minute).toISOString();
        const bookingRef = `KMP-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

        setTimeout(() => {
            addBooking({
                id: bookingRef,
                customer_id: user.id,
                service_id: service.id,
                status: 'pending',
                meeting_type: meetingType,
                location_address: meetingType === 'physical' ? address : 'Virtual Meeting Space',
                scheduled_date: scheduledDate,
                created_at: new Date().toISOString()
            });

            const earned = Math.floor(service.base_price / 100);
            updatePoints(usePoints ? -Math.floor(discountAmount * 10) : earned);

            alert(`Production Secured: ${bookingRef}\nStatus: PENDING REVIEW`);
            onSuccess();
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-500 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl rounded-full -mr-16 -mt-16"></div>

            <header className="flex justify-between items-start relative z-10">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">Phase 1 Production</p>
                    <h3 className="text-3xl font-black tracking-tighter italic uppercase">{service.title}</h3>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1">Total Stake</p>
                    <p className="text-2xl font-black italic tracking-tighter">R{finalPrice.toFixed(2)}</p>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                {/* Meeting Type Toggle */}
                <div className="space-y-3">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Engagement Mode</label>
                    <div className="bg-gray-950 p-1.5 rounded-[2rem] border border-gray-800 flex gap-1.5">
                        <button
                            type="button"
                            onClick={() => setMeetingType('physical')}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all ${meetingType === 'physical' ? 'bg-red-600 text-white shadow-xl shadow-red-900/40' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <Map size={16} /> Physical
                        </button>
                        <button
                            type="button"
                            onClick={() => setMeetingType('virtual')}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all ${meetingType === 'virtual' ? 'bg-red-600 text-white shadow-xl shadow-red-900/40' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <Monitor size={16} /> Virtual
                        </button>
                    </div>
                </div>

                {/* Advanced Date/Time Picker */}
                <div className="space-y-4">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                        <Calendar size={12} /> Temporal Alignment
                    </label>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-3 text-center flex flex-col items-center">
                            <button type="button" onClick={() => setDay(d => Math.min(31, d + 1))}><ChevronUp size={12} /></button>
                            <span className="font-bold text-lg">{day}</span>
                            <button type="button" onClick={() => setDay(d => Math.max(1, d - 1))}><ChevronDown size={12} /></button>
                            <span className="text-[7px] text-gray-600 font-black uppercase">Day</span>
                        </div>
                        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-3 text-center flex flex-col items-center">
                            <button type="button" onClick={() => setMonth(m => Math.min(11, m + 1))}><ChevronUp size={12} /></button>
                            <span className="font-bold text-lg">{month + 1}</span>
                            <button type="button" onClick={() => setMonth(m => Math.max(0, m - 1))}><ChevronDown size={12} /></button>
                            <span className="text-[7px] text-gray-600 font-black uppercase">Month</span>
                        </div>
                        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-3 text-center flex flex-col items-center">
                            <button type="button" onClick={() => setYear(y => y + 1)}><ChevronUp size={12} /></button>
                            <span className="font-bold text-lg text-red-500">{year}</span>
                            <button type="button" onClick={() => setYear(y => y - 1)}><ChevronDown size={12} /></button>
                            <span className="text-[7px] text-gray-600 font-black uppercase">Year</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3 pt-2">
                        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-3 text-center flex flex-col items-center">
                            <button type="button" onClick={() => setHour(h => h === 12 ? 1 : h + 1)}><ChevronUp size={10} /></button>
                            <span className="font-bold text-lg">{hour}</span>
                            <button type="button" onClick={() => setHour(h => h === 1 ? 12 : h - 1)}><ChevronDown size={10} /></button>
                        </div>
                        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-3 text-center flex flex-col items-center">
                            <button type="button" onClick={() => setMinute(m => m === 59 ? 0 : m + 1)}><ChevronUp size={10} /></button>
                            <span className="font-bold text-lg">{minute < 10 ? `0${minute}` : minute}</span>
                            <button type="button" onClick={() => setMinute(m => m === 0 ? 59 : m - 1)}><ChevronDown size={10} /></button>
                        </div>
                        <button
                            type="button"
                            onClick={() => setPeriod(period === 'AM' ? 'PM' : 'AM')}
                            className="bg-gray-950 border border-gray-800 rounded-2xl p-3 text-center hover:border-red-600 transition-colors"
                        >
                            <span className="block text-[8px] text-gray-600 font-black uppercase">Period</span>
                            <span className="font-bold text-lg text-red-500">{period}</span>
                        </button>
                        <div className="bg-gray-950/20 border border-gray-900 rounded-2xl flex items-center justify-center p-3">
                            <Clock size={24} className="text-gray-800" />
                        </div>
                    </div>
                </div>

                {/* Location with GPS Support */}
                <div className={`space-y-2 transition-all duration-500 ${meetingType === 'virtual' ? 'opacity-30 pointer-events-none scale-95 blur-sm' : 'opacity-100'}`}>
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 flex items-center gap-2">
                            <MapPin size={12} /> Spatial Coordinates
                        </label>
                        <button
                            type="button"
                            onClick={handleGPS}
                            disabled={isDetecting}
                            className="text-[9px] font-black uppercase tracking-widest text-red-500 flex items-center gap-1.5 hover:underline disabled:opacity-50"
                        >
                            {isDetecting ? 'Syncing...' : 'Detect GPS'} <Navigation size={10} />
                        </button>
                    </div>
                    <textarea
                        className="w-full bg-gray-950 border border-gray-800 p-5 rounded-[2rem] focus:border-red-600 outline-none text-sm transition-all h-24 placeholder:text-gray-800 shadow-inner"
                        placeholder="System waiting for location address..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                {/* Rewards Hub */}
                <div className="bg-gray-950/50 border border-gray-800 rounded-[2.5rem] p-6 space-y-6 shadow-inner relative overflow-hidden group">
                    <div className="flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-600/10 rounded-xl flex items-center justify-center text-red-500">
                                <Gift size={18} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">KMP Rewards Pool</span>
                        </div>
                        <span className="text-xs font-mono font-black text-red-500 italic">{user?.points} Tokens</span>
                    </div>

                    <button
                        type="button"
                        onClick={() => setUsePoints(!usePoints)}
                        className={`w-full py-5 px-6 rounded-[2rem] border flex items-center justify-between transition-all relative overflow-hidden ${usePoints ? 'bg-green-600/10 border-green-600/50 shadow-lg shadow-green-900/10' : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'}`}
                    >
                        <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shrink-0">
                            {usePoints ? <Check size={16} className="text-green-500" /> : <Calculator size={16} className="text-gray-500" />}
                            Apply Max Yield (30%)
                        </span>
                        {usePoints && (
                            <span className="text-sm font-black text-green-500 italic animate-in slide-in-from-right-2">
                                -R{discountAmount.toFixed(0)}
                            </span>
                        )}
                    </button>

                    {!usePoints && (
                        <div className="flex items-center gap-2 px-2 text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                            <Sparkles size={10} /> Earn {Math.floor(service.base_price / 100)} tokens on confirmation
                        </div>
                    )}
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-800 border-dashed">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-5 rounded-[2rem] bg-gray-950 border border-gray-800 text-gray-600 font-black uppercase tracking-widest text-[10px] hover:text-white transition-all"
                    >
                        Abort
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-[2] py-5 rounded-[2rem] bg-red-600 text-white font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-red-900/40 hover:bg-red-700 transition-all disabled:opacity-50 relative overflow-hidden"
                    >
                        {loading ? 'Securing...' : 'Lock Production Order'}
                    </button>
                </div>
            </form>
        </div>
    );
}
