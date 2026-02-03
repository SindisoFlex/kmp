import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Service } from '../../../types';
import BookingForm from '../../../components/booking/BookingForm';

export default function ServiceList() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data, error } = await supabase.from('services').select('*').eq('active', true);

            if (error) throw error;

            if (data && data.length > 0) {
                setServices(data);
            } else {
                // Mock data if DB is empty for demo purposes
                setServices([
                    { id: '1', title: 'Wedding Photography', description: 'Full day coverage with 2 shooters.', base_price: 15000, requires_location: true },
                    { id: '2', title: 'Studio Portrait', description: '1 hour session in our studio.', base_price: 1500, requires_location: false },
                    { id: '3', title: 'Corporate Video', description: 'On-site promotional video.', base_price: 8000, requires_location: true },
                ]);
            }
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading services...</div>;

    if (selectedService) {
        return (
            <BookingForm
                service={selectedService}
                onCancel={() => setSelectedService(null)}
                onSuccess={() => { setSelectedService(null); alert("Refresh to see booking (not impl in this view yet)"); }}
            />
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
                <div key={service.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-500 transition cursor-pointer flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                                {service.requires_location ? '📍 On-Location' : '🏠 Studio/Digital'}
                            </span>
                            <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                                R{service.base_price}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => setSelectedService(service)}
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                    >
                        Book Now
                    </button>
                </div>
            ))}
        </div>
    );
}
