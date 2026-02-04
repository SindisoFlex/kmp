import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Service } from '../../../types';
import BookingForm from '../../../components/booking/BookingForm';
import { useAuth } from '../../../context/AuthContext';
import { Camera, Video, Monitor, PenTool, Printer, Zap, Globe, ArrowRight } from 'lucide-react';

export default function ServiceList() {
    const { user } = useAuth();
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
        // Favoring stable demo data for Phase 1 to avoid unresolved Supabase placeholders
        const demoData: Service[] = [
            { id: 'srv-1', title: 'Photography', description: 'Professional shoots for events, weddings, and products.', base_price: 1500, requires_location: true },
            { id: 'srv-2', title: 'Videography', description: 'High-quality cinematic production and editing.', base_price: 3500, requires_location: true },
            { id: 'srv-3', title: 'Web & App Development', description: 'Functional, high-performance digital solutions.', base_price: 8500, requires_location: false },
            { id: 'srv-4', title: 'AI Training', description: 'Future-ready AI skills for individuals and teams.', base_price: 2500, requires_location: false },
            { id: 'srv-5', title: 'Graphic Design', description: 'Visual identity, branding, and marketing collateral.', base_price: 1200, requires_location: false },
            { id: 'srv-6', title: 'Printing', description: 'Large scale and precision printing services.', base_price: 950, requires_location: true },
            { id: 'srv-7', title: 'Digital Marketing', description: 'Strategic growth through SEO, Ads, and Social Media.', base_price: 4500, requires_location: false }
        ];

        setServices(demoData);
        setLoading(false);
    }, []);

    const fetchServices = async () => {
        // Mocked out to favor demo stability
    };

    if (loading) return (
        <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">Synchronizing Production Core</p>
        </div>
    );

    // 🛡️ RECOVERY UI FOR BLANK SCREEN PREVENTION
    if (selectedService) {
        return (
            <div className="animate-in fade-in zoom-in-95 duration-500">
                <BookingForm
                    service={selectedService}
                    onCancel={() => setSelectedService(null)}
                    onSuccess={() => {
                        setSelectedService(null);
                        // Refresh effect or success state can go here
                    }}
                />
            </div>
        );
    }

    const serviceArray = Array.isArray(services) ? services : [];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-2">
                <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em]">Resource Selector</p>
                <div className="flex justify-between items-end">
                    <h2 className="text-4xl font-black tracking-tighter italic uppercase text-white">
                        Welcome, <span className="text-red-500">{user?.full_name?.split(' ')[0] || 'Client'}</span>
                    </h2>
                    <div className="bg-gray-900 px-4 py-2 rounded-full border border-gray-800 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Active System</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-5">
                {serviceArray.length > 0 ? serviceArray.map((service: Service) => {
                    const Icon = service?.title ? (iconMap[service.title] || Camera) : Camera;
                    return (
                        <div
                            key={service.id || Math.random().toString()}
                            onClick={() => setSelectedService(service)}
                            className="group bg-gray-950 border border-gray-900 p-6 rounded-[2.5rem] hover:border-red-600/50 transition-all duration-300 cursor-pointer flex items-center gap-6 shadow-2xl hover:shadow-red-600/5 active:scale-[0.98]"
                        >
                            <div className="w-16 h-16 bg-gray-900 rounded-[1.5rem] flex items-center justify-center border border-gray-800 group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-300 shadow-inner">
                                <Icon size={28} className="text-gray-500 group-hover:text-white transition-colors" />
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="text-lg font-black tracking-tight uppercase italic text-white group-hover:text-red-500 transition-colors">{service.title || 'Unknown Asset'}</h3>
                                    <p className="text-sm font-black text-gray-400 font-mono tracking-tighter">R{(service.base_price || 0).toLocaleString()}</p>
                                </div>
                                <p className="text-[11px] text-gray-600 font-bold leading-relaxed mb-3 line-clamp-1">{service.description || 'No description available for this deployment.'}</p>
                                <div className="flex items-center gap-4">
                                    <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${service.requires_location ? 'border-blue-900/50 text-blue-500 bg-blue-500/5' : 'border-purple-900/50 text-purple-500 bg-purple-500/5'}`}>
                                        {service.requires_location ? '📍 Physical Deployment' : '🌐 Virtual Sync'}
                                    </span>
                                    <span className="text-[8px] font-black text-gray-800 uppercase tracking-widest group-hover:text-red-900 transition-colors">Yield: +{Math.floor((service.base_price || 0) / 100)} T</span>
                                </div>
                            </div>

                            <div className="w-10 h-10 rounded-full border border-gray-900 flex items-center justify-center text-gray-800 group-hover:text-red-500 group-hover:border-red-600/30 transition-all">
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    );
                }) : (
                    <div className="p-20 text-center space-y-4 bg-gray-950/50 border-2 border-dashed border-gray-900 rounded-[3rem]">
                        <Info className="mx-auto text-gray-800" size={32} />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700">No active resources in this sector</p>
                    </div>
                )}
            </div>

            <footer className="pt-10 text-center">
                <p className="text-[8px] font-black text-gray-800 uppercase tracking-[0.8em]">Kasilam Media Production // Production Core v1.2</p>
            </footer>
        </div>
    );
}
