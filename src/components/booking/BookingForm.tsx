import { useState, useEffect } from 'react';
import { Service } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useBookings } from '../../context/BookingContext';
import {
    Gift, Calendar, MapPin, Calculator, Check, Monitor, Map,
    Navigation, Clock, ChevronDown, Sparkles, ChevronUp,
    Search, Link as LinkIcon, Info
} from 'lucide-react';

interface BookingFormProps {
    service: Service;
    onCancel: () => void;
    onSuccess: () => void;
}

// Mock address suggestions for Antigravity demo
const MOCK_SUGGESTIONS = [
    "123 Vilakazi St, Orlando West, Soweto",
    "Sandton City, Rivonia Rd, Sandhurst",
    "Cape Town CBD, Long Street",
    "Durban North, uMhlanga Rocks Dr",
    "Gqeberha, Summerstrand View",
    "Pretoria East, Menlyn Main"
];

export default function BookingForm({ service, onCancel, onSuccess }: BookingFormProps) {
    const { user, updatePoints } = useAuth();
    const { addBooking } = useBookings();

    // Form State
    const [address, setAddress] = useState('');
    const [virtualLink, setVirtualLink] = useState('');
    const [meetingType, setMeetingType] = useState<'physical' | 'virtual'>(service.requires_location ? 'physical' : 'virtual');
    const [loading, setLoading] = useState(false);
    const [isDetecting, setIsDetecting] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

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

    // Handle Mock Auto-suggest
    const handleAddressChange = (val: string) => {
        setAddress(val);
        if (val.length > 2) {
            const filtered = MOCK_SUGGESTIONS.filter(s => s.toLowerCase().includes(val.toLowerCase()));
            setFilteredSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
        } else {
            setShowSuggestions(false);
        }
    };

    const selectSuggestion = (s: string) => {
        setAddress(s);
        setShowSuggestions(false);
    };

    const handleGPS = () => {
        setIsDetecting(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setAddress(`GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
                setIsDetecting(false);
                setShowSuggestions(false);
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
                location_address: meetingType === 'physical' ? address : undefined,
                virtual_link: meetingType === 'virtual' ? virtualLink : undefined,
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
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">Antigravity Protocol</p>
                    <h3 className="text-3xl font-black tracking-tighter italic uppercase">{service.title}</h3>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1">Total Valuation</p>
                    <p className="text-2xl font-black italic tracking-tighter shadow-sm">R{finalPrice.toLocaleString()}</p>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                {/* Meeting Type Toggle */}
                <div className="space-y-3">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Engagement Mode</label>
                    <div className="bg-gray-950 p-1.5 rounded-[2rem] border border-gray-800 flex gap-1.5 shadow-inner">
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

                {/* Date/Time Selector Area */}
                <div className="space-y-4">
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                        <Calendar size={12} /> Production Schedule
                    </label>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-4 text-center flex flex-col items-center group/item hover:border-red-600/30 transition-colors shadow-inner">
                            <button type="button" onClick={() => setDay(d => Math.min(31, d + 1))} className="text-gray-700 hover:text-red-500"><ChevronUp size={16} /></button>
                            <span className="font-black text-2xl tracking-tighter py-1">{day}</span>
                            <button type="button" onClick={() => setDay(d => Math.max(1, d - 1))} className="text-gray-700 hover:text-red-500"><ChevronDown size={16} /></button>
                            <span className="text-[7px] text-gray-600 font-black uppercase tracking-widest mt-1">Day</span>
                        </div>
                        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-4 text-center flex flex-col items-center group/item hover:border-red-600/30 transition-colors shadow-inner">
                            <button type="button" onClick={() => setMonth(m => Math.min(11, m + 1))} className="text-gray-700 hover:text-red-500"><ChevronUp size={16} /></button>
                            <span className="font-black text-2xl tracking-tighter py-1 text-red-500">{month + 1}</span>
                            <button type="button" onClick={() => setMonth(m => Math.max(0, m - 1))} className="text-gray-700 hover:text-red-500"><ChevronDown size={16} /></button>
                            <span className="text-[7px] text-gray-600 font-black uppercase tracking-widest mt-1">Month</span>
                        </div>
                        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-4 text-center flex flex-col items-center group/item hover:border-red-600/30 transition-colors shadow-inner">
                            <button type="button" onClick={() => setYear(y => y + 1)} className="text-gray-700 hover:text-red-500"><ChevronUp size={16} /></button>
                            <span className="font-black text-xl tracking-tighter py-1">{year}</span>
                            <button type="button" onClick={() => setYear(y => y - 1)} className="text-gray-700 hover:text-red-500"><ChevronDown size={16} /></button>
                            <span className="text-[7px] text-gray-600 font-black uppercase tracking-widest mt-1">Year</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-4 text-center flex flex-col items-center shadow-inner">
                            <button type="button" onClick={() => setHour(h => h === 12 ? 1 : h + 1)} className="text-gray-700 hover:text-red-500"><ChevronUp size={14} /></button>
                            <span className="font-black text-xl">{hour}</span>
                            <button type="button" onClick={() => setHour(h => h === 1 ? 12 : h - 1)} className="text-gray-700 hover:text-red-500"><ChevronDown size={14} /></button>
                        </div>
                        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-4 text-center flex flex-col items-center shadow-inner">
                            <button type="button" onClick={() => setMinute(m => m === 59 ? 0 : m + 1)} className="text-gray-700 hover:text-red-500"><ChevronUp size={14} /></button>
                            <span className="font-black text-xl">{minute < 10 ? `0${minute}` : minute}</span>
                            <button type="button" onClick={() => setMinute(m => m === 0 ? 59 : m - 1)} className="text-gray-700 hover:text-red-500"><ChevronDown size={14} /></button>
                        </div>
                        <button
                            type="button"
                            onClick={() => setPeriod(period === 'AM' ? 'PM' : 'AM')}
                            className="bg-gray-950 border border-gray-800 rounded-3xl p-4 text-center hover:bg-red-600 transition-all group shadow-inner"
                        >
                            <span className="block text-[7px] text-gray-600 group-hover:text-red-200 font-black uppercase tracking-widest mb-1">Unit</span>
                            <span className="font-black text-xl text-red-500 group-hover:text-white uppercase">{period}</span>
                        </button>
                        <div className="bg-red-600/5 border border-red-600/10 rounded-3xl flex items-center justify-center p-4">
                            <Clock size={28} className="text-red-600/30" />
                        </div>
                    </div>
                </div>

                {/* Location Input with Auto-Suggest & GPS */}
                <div className={`space-y-4 transition-all duration-500 ${meetingType === 'virtual' ? 'hidden' : 'block animate-in slide-in-from-top-4'}`}>
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 flex items-center gap-2">
                            <MapPin size={12} /> Geospatial Coordinates
                        </label>
                        <button
                            type="button"
                            onClick={handleGPS}
                            disabled={isDetecting}
                            className="text-[9px] font-black uppercase tracking-widest text-red-500 flex items-center gap-1.5 hover:underline disabled:opacity-50"
                        >
                            {isDetecting ? 'Querying...' : 'Force GPS'} <Navigation size={10} />
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute top-5 left-5 text-gray-700">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            className="w-full bg-gray-950 border border-gray-800 py-5 pl-14 pr-6 rounded-[2rem] focus:border-red-600 outline-none text-sm font-bold placeholder:text-gray-800 shadow-inner"
                            placeholder="Type physical address for production..."
                            value={address}
                            onChange={(e) => handleAddressChange(e.target.value)}
                            onFocus={() => address.length > 2 && setShowSuggestions(true)}
                        />

                        {/* Auto-suggest Dropdown */}
                        {showSuggestions && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden z-50 shadow-2xl animate-in fade-in slide-in-from-top-2">
                                {filteredSuggestions.map((s, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => selectSuggestion(s)}
                                        className="w-full text-left p-4 hover:bg-red-600 hover:text-white text-[10px] font-bold uppercase tracking-widest border-b border-gray-800 last:border-0 transition-colors"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Virtual Link / Notes field */}
                <div className={`space-y-4 transition-all duration-500 ${meetingType === 'physical' ? 'hidden' : 'block animate-in slide-in-from-top-4'}`}>
                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                        <LinkIcon size={12} /> Remote Connectivity
                    </label>
                    <div className="relative">
                        <div className="absolute top-5 left-5 text-gray-700">
                            <Monitor size={18} />
                        </div>
                        <input
                            type="text"
                            className="w-full bg-gray-950 border border-gray-800 py-5 pl-14 pr-6 rounded-[2rem] focus:border-red-600 outline-none text-sm font-bold placeholder:text-gray-800 shadow-inner"
                            placeholder="Video Link (Zoom/Meet) or Remote Notes..."
                            value={virtualLink}
                            onChange={(e) => setVirtualLink(e.target.value)}
                        />
                    </div>
                    <div className="bg-red-600/5 border border-red-600/10 p-4 rounded-2xl flex gap-3 text-red-500/80">
                        <Info size={16} className="shrink-0" />
                        <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed">System will auto-generate production room if link is left empty.</p>
                    </div>
                </div>

                {/* Rewards Consumption Hub */}
                <div className="bg-gray-950/50 border border-gray-800 rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative overflow-hidden group">
                    <div className="flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-500 border border-red-600/20">
                                <Gift size={20} />
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Inventory Status</span>
                                <p className="text-xs font-mono font-black text-white italic">{user?.points} KMP Tokens Available</p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setUsePoints(!usePoints)}
                        className={`w-full py-6 px-8 rounded-[2.2rem] border flex items-center justify-between transition-all relative overflow-hidden ${usePoints ? 'bg-green-600/10 border-green-600/50 shadow-xl shadow-green-900/10' : 'bg-gray-900/50 border-gray-800 hover:border-gray-700 shadow-inner'}`}
                    >
                        <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shrink-0">
                            {usePoints ? <Check size={18} className="text-green-500" /> : <Calculator size={18} className="text-gray-600" />}
                            Initialize Max Yield (30%)
                        </span>
                        {usePoints && (
                            <div className="flex flex-col items-end animate-in slide-in-from-right-4">
                                <span className="text-lg font-black text-green-500 italic leading-none">-R{discountAmount.toLocaleString()}</span>
                                <span className="text-[8px] font-bold text-green-600 uppercase tracking-widest">Saved</span>
                            </div>
                        )}
                    </button>

                    {!usePoints && (
                        <div className="flex items-center gap-2 px-2 text-[9px] font-black text-gray-700 uppercase tracking-[0.2em]">
                            <Sparkles size={12} className="text-gray-800" /> Secure {Math.floor(service.base_price / 100)} tokens upon confirmation
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-gray-800 border-dashed">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-6 rounded-[2.2rem] bg-gray-950 border border-gray-800 text-gray-600 font-black uppercase tracking-[0.2em] text-[10px] hover:text-white hover:border-gray-600 transition-all shadow-lg active:scale-95"
                    >
                        Terminate
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-[2] py-6 rounded-[2.2rem] bg-red-600 text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-red-900/60 hover:bg-red-700 hover:scale-[1.02] transition-all disabled:opacity-50 relative overflow-hidden active:scale-95"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
                            </div>
                        ) : 'Lock Production Sequence'}
                    </button>
                </div>
            </form>
        </div>
    );
}
