import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    signIn: (email: string, password?: string) => Promise<void>;
    signOut: () => Promise<void>;
    debugLogin: (id: string) => void;
    updatePoints: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo Clients Data
const DEMO_CLIENTS: Record<string, UserProfile> = {
    'client-001': {
        id: 'client-001',
        email: 'sibusiso@kmp.co.za',
        role: 'customer',
        full_name: 'Sibusiso Gumede',
        points: 1250,
        total_spent: 12500
    },
    'client-002': {
        id: 'client-002',
        email: 'nomvula@kmp.co.za',
        role: 'customer',
        full_name: 'Nomvula Zulu',
        points: 450,
        total_spent: 4500
    },
    'staff': { id: 'staff-001', email: 'operations@kmp.co.za', role: 'staff', full_name: 'Lerato Staff', points: 0, total_spent: 0 },
    'freelancer': { id: 'free-001', email: 'creative@kmp.co.za', role: 'freelancer', full_name: 'David Freelancer', points: 0, total_spent: 0 },
    'admin': { id: 'admin-001', email: 'master@kmp.co.za', role: 'admin', full_name: 'KMP Admin', points: 0, total_spent: 0 }
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simple session persistence for demo
        const saved = localStorage.getItem('kmp_user');
        if (saved) setUser(JSON.parse(saved));
        setLoading(false);
    }, []);

    const signIn = async (email: string) => {
        const found = Object.values(DEMO_CLIENTS).find(c => c.email === email);
        const userData = found || { ...DEMO_CLIENTS.customer, email, full_name: email.split('@')[0] };
        setUser(userData);
        localStorage.setItem('kmp_user', JSON.stringify(userData));
    };

    const signOut = async () => {
        setUser(null);
        localStorage.removeItem('kmp_user');
    };

    const debugLogin = (id: string) => {
        const userData = DEMO_CLIENTS[id] || DEMO_CLIENTS.customer;
        setUser(userData);
        localStorage.setItem('kmp_user', JSON.stringify(userData));
    };

    const updatePoints = (amount: number) => {
        if (!user) return;
        const updated = { ...user, points: user.points + amount };
        setUser(updated);
        localStorage.setItem('kmp_user', JSON.stringify(updated));
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut, debugLogin, updatePoints }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
