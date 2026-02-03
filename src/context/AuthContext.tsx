import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { UserProfile, UserRole } from '../types';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
    session: Session | null;
    user: UserProfile | null;
    loading: boolean;
    signOut: () => Promise<void>;
    isAdmin: boolean;
    isStaff: boolean;
    isFreelancer: boolean;
    debugLogin: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) fetchProfile(session.user.id, session.user.email!);
            else setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchProfile(session.user.id, session.user.email!);
            else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId: string, email: string) => {
        try {
            // In a real app, we fetch from the 'users' table
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();

            if (error || !data) {
                // Fallback for demo/initialization if user record doesn't exist yet
                console.warn("User profile not found, using mock profile for dev");
                setUser({
                    id: userId,
                    email,
                    role: 'customer',
                    full_name: 'Sibusiso Gumede', // South African Demo Name
                    points: 1250, // Demo point balance
                    total_spent: 12500
                });
            } else {
                setUser(data as UserProfile);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
    };

    const debugLogin = (role: UserRole) => {
        const mockUser: UserProfile = {
            id: 'debug-user-123',
            email: `debug-${role}@kasilam.com`,
            role: role,
            full_name: `Debug ${role.charAt(0).toUpperCase() + role.slice(1)}`,
            points: role === 'customer' ? 100 : 0, // 100 points = R1000 value or 10% starter
            total_spent: 0
        };
        setUser(mockUser);
        setLoading(false);
    };

    const value = {
        session,
        user,
        loading,
        signOut,
        isAdmin: user?.role === 'admin',
        isStaff: user?.role === 'staff',
        isFreelancer: user?.role === 'freelancer',
        debugLogin,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
