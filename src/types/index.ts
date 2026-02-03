export type UserRole = 'customer' | 'freelancer' | 'staff' | 'admin';

export interface UserProfile {
    id: string;
    email: string;
    role: UserRole;
    full_name: string;
    points: number;
    total_spent: number;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    requires_location: boolean;
    base_price: number;
}

export interface Booking {
    id: string;
    customer_id: string;
    service_id: string;
    freelancer_id?: string;
    status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
    meeting_type: 'physical' | 'virtual';
    location_address?: string;
    scheduled_date: string;
    created_at: string;
}
