import { useState } from 'react';
import { Service } from '../../types';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return alert("You must be logged in.");

        setLoading(true);

        try {
            const { error } = await supabase.from('bookings').insert({
                customer_id: user.id,
                service_id: service.id,
                status: 'pending',
                location_address: service.requires_location ? address : null,
                scheduled_date: new Date(date).toISOString(),
            });

            if (error) throw error;

            alert("Booking created successfully!");
            onSuccess();
        } catch (error) {
            console.error("Booking error:", error);
            alert("Failed to create booking.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-white">Book Service: <span className="text-red-500">{service.title}</span></h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Preferred Date & Time</label>
                    <input
                        type="datetime-local"
                        required
                        className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-red-500 outline-none"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                {service.requires_location && (
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Location Address</label>
                        <textarea
                            required
                            className="w-full bg-gray-700 text-white p-2 rounded border border-gray-600 focus:border-red-500 outline-none"
                            placeholder="123 Main St, City..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                )}

                {!service.requires_location && (
                    <p className="text-sm text-gray-500 italic">This is a digital/studio service. No location required.</p>
                )}

                <div className="flex gap-4 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Confirm Booking'}
                    </button>
                </div>
            </form>
        </div>
    );
}
