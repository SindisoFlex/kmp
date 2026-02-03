import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface RoleBasedRouteProps {
    allowedRoles: UserRole[];
}

export default function RoleBasedRoute({ allowedRoles }: RoleBasedRouteProps) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="p-10 text-center text-white">Loading access rights...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        // Redirect based on their actual role if they try to access a forbidden area
        if (user.role === 'admin') return <Navigate to="/admin" replace />;
        if (user.role === 'staff') return <Navigate to="/staff" replace />;
        if (user.role === 'freelancer') return <Navigate to="/freelancer" replace />;
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
