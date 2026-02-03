import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Booking } from '../types';

interface BookingContextType {
    bookings: Booking[];
    addBooking: (booking: Booking) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('kmp_bookings');
        if (saved) {
            setBookings(JSON.parse(saved));
        } else {
            // Initial Demo Bookings
            const demo: Booking[] = [
                {
                    id: 'KMP-AX829',
                    customer_id: 'client-001',
                    service_id: 'srv-1',
                    status: 'accepted',
                    meeting_type: 'physical',
                    location_address: 'Soweto, Gauteng Market',
                    scheduled_date: '2026-02-15T14:00:00Z',
                    created_at: new Date().toISOString()
                },
                {
                    id: 'KMP-ZV702',
                    customer_id: 'client-002',
                    service_id: 'srv-4',
                    status: 'pending',
                    meeting_type: 'virtual',
                    virtual_link: 'https://meet.google.com/kmp-session',
                    scheduled_date: '2026-02-20T10:00:00Z',
                    created_at: new Date().toISOString()
                }
            ];
            setBookings(demo);
            localStorage.setItem('kmp_bookings', JSON.stringify(demo));
        }
    }, []);

    const addBooking = (booking: Booking) => {
        const updated = [booking, ...bookings];
        setBookings(updated);
        localStorage.setItem('kmp_bookings', JSON.stringify(updated));
    };

    return (
        <BookingContext.Provider value={{ bookings, addBooking }}>
            {children}
        </BookingContext.Provider>
    );
}

export const useBookings = () => {
    const context = useContext(BookingContext);
    if (!context) throw new Error('useBookings must be used within a BookingProvider');
    return context;
};
