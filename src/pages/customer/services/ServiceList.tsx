import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Service } from '../../../types';
import BookingForm from '../../../components/booking/BookingForm';
import { Camera, Video, Monitor, PenTool, Printer, Zap, Globe, ArrowRight, ZapOff } from 'lucide-react';

export default function ServiceList() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const iconMap: Record<string, any> = {
        'Photography': Camera,
        'Videography': Video,
        'Web & App Development': Monitor,
        'AI Training': Zap,
        'Graphic Design': PenTool,
        'Printing': Printer,
        'Digital Marketing': Globe,
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data } = await supabase.from('services').select('*').eq('active', true);
            if (data && data.length > 0) {
                setServices(data);
            } else {
                setServices([
                    { id: 'srv-1', title: 'Photography', description: 'Professional captures for any occasion.', base_price: 1500, requires_location: true },
                    { id: 'srv-2', title: 'Videography', description: 'Cinematic storytelling at its finest.', base_price: 3500, requires_location: true },
                    { id: 'srv-3', title: 'Web & App Development', description: 'Future-ready digital architecture.', base_price: 8500, requires_location: false },
                    { id: 'srv-4', title: 'AI Training', description: 'Mastering the tools of tomorrow.', base_price: 2500, requires_location: false },
                    { id: 'srv-5', title: 'Graphic Design', description: 'Clean, professional visual identities.', base_price: 1200, requires_location: false },
                    { id: 'srv-6', title: 'Printing', description: 'Premium physical deliverables.', base_price: 450, requires_location: false },
                    { id: 'srv-7', title: 'Digital Marketing', description: 'Global visibility strategies.', base_price: 5500, requires_location: false },
                ]);
            }
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-10 text-center animate-pulse text-gray-500 font-mono text-[10px] tracking-[0.3em]">SYNCHRONIZING SERVICES...</div>;

    if (selectedService) {
        return (
            <div className="animate-in fade-in duration-500">
                <BookingForm
                    service={selectedService}
                    onCancel={() => setSelectedService(null)}
                    onSuccess={() => setSelectedService(null)}
                />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {services.map((service) => {
                const Icon = iconMap[service.title] || Camera;
                return (
                    <div
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className="bg-gray-900 border border-gray-800 p-5 rounded-[2rem] hover:border-red-600/50 transition-all duration-300 cursor-pointer group flex items-center gap-5 shadow-lg active:scale-95"
                    >
                        <div className="w-14 h-14 bg-gray-950 rounded-2xl flex items-center justify-center border border-gray-800 group-hover:bg-red-600/10 group-hover:border-red-600/30 transition-colors">
                            <Icon size={24} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-sm font-bold tracking-tight uppercase">{service.title}</h3>
                                <p className="text-xs font-black text-white italic">R{service.base_price}</p>
                            </div>
                            <p className="text-[10px] text-gray-500 font-light leading-relaxed mb-2 pr-6">{service.description}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-[8px] bg-gray-950 px-2 py-0.5 rounded-full text-gray-400 border border-gray-800 uppercase tracking-widest font-bold">
                                    {service.requires_location ? '📍 On-Site' : '🌐 Remote'}
                                </span>
                            </div>
                        </div>

                        <div className="bg-gray-950 p-2 rounded-full border border-gray-800 group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white text-gray-600 transition-all">
                            <ArrowRight size={14} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
