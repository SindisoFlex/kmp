import { useState, useEffect } from 'react';
import { Service } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useBookings } from '../../context/BookingContext';
import {
    Gift, Calendar, MapPin, Calculator, Check, Monitor, Map,
    Navigation, Clock, Sparkles, Search, Link as LinkIcon, Info,
    X, ArrowRight, ChevronRight
} from 'lucide-react';

interface BookingFormProps {
    service: Service;
    onCancel: () => void;
    onSuccess: () => void;
}

const MOCK_DATA = [
    { address: "123 Vilakazi St, Orlando West, Soweto", lat: -26.2386, lng: 27.9099 },
    { address: "Sandton City, Rivonia Rd, Sandhurst", lat: -26.1076, lng: 28.0567 },
    { address: "Cape Town CBD, Long Street", lat: -33.9249, lng: 18.4241 },
    { address: "Durban North, uMhlanga Rocks Dr", lat: -29.7397, lng: 31.0658 }
];

export default function BookingForm({ service, onCancel, onSuccess }: BookingFormProps) {
    // 🛡️ SUPER DEFENSIVE CONTEXT ACCESS
    const auth = useAuth();
    const bookingCtx = useBookings();

    // Fallbacks to prevent "useBookings must be used within..." crashes if something is weird in the tree
    const user = auth?.user || null;
    const updatePoints = auth?.updatePoints || (() => { });
    const addBooking = bookingCtx?.addBooking || (() => { });

    // 🛡️ PROP SAFETY
    if (!service) {
        return (
            <div className="bg-gray-900 border border-red-900/50 p-12 rounded-[2.5rem] text-center space-y-4">
                <Info className="mx-auto text-red-500" size={40} />
                <h3 className="text-xl font-black uppercase text-white">System Calibration Error</h3>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Target service data packet is corrupt or missing.</p>
                <button onClick={onCancel} className="bg-red-600 px-8 py-3 rounded-full text-[10px] font-black uppercase text-white tracking-widest">Abord Sequence</button>
            </div>
        );
    }

    // Determine default meeting type based on service
    const isDigital = ['srv-3', 'srv-4', 'srv-7'].includes(service.id) || !service.requires_location;
    const defaultMeetingType = isDigital ? 'virtual' : 'physical';

    // Form State
    const [address, setAddress] = useState('');
    const [coords, setCoords] = useState<{ lat: number, lng: number } | undefined>();
    const [virtualLink, setVirtualLink] = useState('');
    const [meetingType, setMeetingType] = useState<'physical' | 'virtual'>(defaultMeetingType);
    const [loading, setLoading] = useState(false);
    const [isDetecting, setIsDetecting] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredData, setFilteredData] = useState<typeof MOCK_DATA>([]);

    // REAL SELECTORS STATE (Day, Month, Year, Hour, Minute, Period)
    const now = new Date();
    const [day, setDay] = useState(now.getDate());
    const [month, setMonth] = useState(now.getMonth());
    const [year, setYear] = useState(now.getFullYear());
    const [hour, setHour] = useState(10);
    const [minute, setMinute] = useState(0);
    const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

    // Rewards
    const [usePoints, setUsePoints] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [finalPrice, setFinalPrice] = useState(service.base_price || 0);

    useEffect(() => {
        if (usePoints && user) {
            const bp = service.base_price || 0;
            const maxDiscount = bp * 0.3;
            const pointsValue = (user.points || 0) * 0.1;
            const actualDiscount = Math.min(maxDiscount, pointsValue);
            setDiscountAmount(actualDiscount);
            setFinalPrice(bp - actualDiscount);
        } else {
            setDiscountAmount(0);
            setFinalPrice(service.base_price || 0);
        }
    }, [usePoints, user, service]);

    const handleGPS = () => {
        setIsDetecting(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setAddress(`GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
                setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                setIsDetecting(false);
            }, () => {
                setIsDetecting(false);
                alert("GPS Protocol Denied.");
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const scheduledDate = new Date(year, month, day, period === 'PM' && hour < 12 ? hour + 12 : (period === 'AM' && hour === 12 ? 0 : hour), minute).toISOString();
        const bookingRef = `KMP-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

        setTimeout(() => {
            addBooking({
                id: bookingRef,
                customer_id: user?.id || 'guest',
                service_id: service.id,
                status: 'pending',
                meeting_type: meetingType,
                location_address: meetingType === 'physical' ? address : undefined,
                location_coordinates: meetingType === 'physical' ? coords : undefined,
                virtual_link: meetingType === 'virtual' ? virtualLink : undefined,
                scheduled_date: scheduledDate,
                created_at: new Date().toISOString()
            });

            const earned = Math.floor((service.base_price || 0) / 100);
            updatePoints(usePoints ? -Math.floor(discountAmount * 10) : earned);

            onSuccess();
            setLoading(false);
        }, 1200);
    };

    // Helper for generating arrays
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = [2026, 2027];
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = [0, 15, 30, 45];

    return (
        <div className="bg-gray-950 border border-gray-800 rounded-[3rem] p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 relative overflow-hidden">
            {/* Design Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

            <header className="flex justify-between items-center relative z-10">
                <button onClick={onCancel} className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800 hover:border-red-600 transition-all">
                    <X size={18} className="text-gray-500" />
                </button>
                <div className="text-center">
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em]">Initialize Production</p>
                    <h3 className="text-2xl font-black tracking-tighter italic uppercase">{service.title}</h3>
                </div>
                <div className="w-10"></div> {/* Spacer */}
            </header>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">

                {/* 📍 ENGAGEMENT PROTOCOL */}
                <div className="space-y-4">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Engagement Protocol</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setMeetingType('physical')}
                            className={`flex flex-col items-center justify-center gap-2 py-4 rounded-3xl border transition-all ${meetingType === 'physical' ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' : 'bg-gray-900 border-gray-800 text-gray-500'}`}
                        >
                            <MapPin size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Physical</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setMeetingType('virtual')}
                            className={`flex flex-col items-center justify-center gap-2 py-4 rounded-3xl border transition-all ${meetingType === 'virtual' ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]' : 'bg-gray-900 border-gray-800 text-gray-500'}`}
                        >
                            <Monitor size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Virtual</span>
                        </button>
                    </div>
                </div>

                {/* 📅 TEMPORAL COORDINATES (REAL SELECTORS) */}
                <div className="space-y-4">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Temporal Coordinates</label>

                    <div className="grid grid-cols-3 gap-2">
                        <select
                            value={day}
                            onChange={(e) => setDay(parseInt(e.target.value))}
                            className="bg-gray-900 border border-gray-800 rounded-2xl py-4 px-3 text-sm font-bold text-center appearance-none outline-none focus:border-red-600"
                        >
                            {days.map(d => <option key={d} value={d}>Day {d}</option>)}
                        </select>
                        <select
                            value={month}
                            onChange={(e) => setMonth(parseInt(e.target.value))}
                            className="bg-gray-900 border border-gray-800 rounded-2xl py-4 px-3 text-sm font-bold text-center appearance-none outline-none focus:border-red-600"
                        >
                            {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
                        </select>
                        <select
                            value={year}
                            onChange={(e) => setYear(parseInt(e.target.value))}
                            className="bg-gray-900 border border-gray-800 rounded-2xl py-4 px-3 text-sm font-bold text-center appearance-none outline-none focus:border-red-600"
                        >
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <select
                            value={hour}
                            onChange={(e) => setHour(parseInt(e.target.value))}
                            className="bg-gray-900 border border-gray-800 rounded-2xl py-4 px-3 text-sm font-bold text-center appearance-none outline-none focus:border-red-600"
                        >
                            {hours.map(h => <option key={h} value={h}>{h < 10 ? `0${h}` : h}</option>)}
                        </select>
                        <select
                            value={minute}
                            onChange={(e) => setMinute(parseInt(e.target.value))}
                            className="bg-gray-900 border border-gray-800 rounded-2xl py-4 px-3 text-sm font-bold text-center appearance-none outline-none focus:border-red-600"
                        >
                            {minutes.map(m => <option key={m} value={m}>{m === 0 ? '00' : m}</option>)}
                        </select>
                        <select
                            value={period}
                            onChange={(e) => setPeriod(e.target.value as 'AM' | 'PM')}
                            className="bg-gray-900 border border-gray-800 rounded-2xl py-4 px-3 text-sm font-black text-center appearance-none outline-none focus:border-red-600 text-red-500"
                        >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                </div>

                {/* 🚀 SMART INPUT AREA */}
                {meetingType === 'physical' ? (
                    <div className="space-y-4 animate-in slide-in-from-top-4 duration-500">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] uppercase font-black tracking-widest text-gray-500">Geospatial Target</label>
                            <button type="button" onClick={handleGPS} disabled={isDetecting} className="text-[8px] font-black uppercase text-red-500 hover:scale-105 transition-all">
                                {isDetecting ? 'Querying...' : 'Force GPS Capture'}
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Type production address..."
                            className="w-full bg-gray-900 border border-gray-800 p-5 rounded-3xl outline-none focus:border-red-600 text-sm font-bold shadow-inner"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                ) : (
                    <div className="space-y-4 animate-in slide-in-from-top-4 duration-500">
                        <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Remote Link / Sync Notes</label>
                        <textarea
                            placeholder="Paste Zoom link or add remote production notes..."
                            className="w-full bg-gray-900 border border-gray-800 p-5 rounded-3xl outline-none focus:border-red-600 text-sm font-bold shadow-inner h-24 resize-none"
                            value={virtualLink}
                            onChange={(e) => setVirtualLink(e.target.value)}
                        />
                    </div>
                )}

                {/* 🎟️ REWARDS HUB */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-[2.5rem] p-6 space-y-4 shadow-inner">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-500">
                                <Gift size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 leading-none">Your Tokens</p>
                                <p className="text-sm font-black text-white italic">{user?.points || 0} T</p>
                            </div>
                        </div>
                        {user && user.points > 0 && (
                            <button
                                type="button"
                                onClick={() => setUsePoints(!usePoints)}
                                className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${usePoints ? 'bg-green-600/10 border-green-500 text-green-500' : 'bg-gray-900 border-gray-800 text-gray-500'}`}
                            >
                                {usePoints ? 'Deducted 30%' : 'Apply Discount'}
                            </button>
                        )}
                    </div>
                </div>

                {/* 💰 FINANCIALS & LOCK */}
                <div className="pt-4 space-y-4">
                    <div className="flex justify-between items-end border-b border-gray-800 pb-4 border-dashed">
                        <div>
                            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Base Fee</p>
                            <p className="text-lg font-black italic tracking-tighter text-gray-400">R{(service.base_price || 0).toLocaleString()}</p>
                        </div>
                        {usePoints && (
                            <div className="text-right">
                                <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Applied Yield</p>
                                <p className="text-lg font-black italic tracking-tighter text-green-500">-R{discountAmount.toLocaleString()}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center bg-white p-6 rounded-[2.5rem] shadow-xl">
                        <div>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter leading-none">Production Total</p>
                            <p className="text-3xl font-black text-black italic tracking-tighter leading-none">R{finalPrice.toLocaleString()}</p>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30 hover:scale-110 active:scale-95 transition-all"
                        >
                            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <ArrowRight size={24} />}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
