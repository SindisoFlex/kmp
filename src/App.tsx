import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RoleBasedRoute from './components/auth/RoleBasedRoute';
import CustomerLogin from './pages/public/Login';
import StaffLogin from './pages/auth/StaffLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import FreelancerDashboard from './pages/freelancer/FreelancerDashboard';
import StaffDashboard from './pages/staff/StaffDashboard';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public / Auth Routes */}
                    <Route path="/login" element={<CustomerLogin />} />
                    <Route path="/portal" element={<StaffLogin />} />

                    {/* Admin Routes */}
                    <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Route>

                    {/* Staff Routes */}
                    <Route element={<RoleBasedRoute allowedRoles={['staff', 'admin']} />}>
                        <Route path="/staff" element={<StaffDashboard />} />
                    </Route>

                    {/* Freelancer Routes */}
                    <Route element={<RoleBasedRoute allowedRoles={['freelancer', 'admin']} />}>
                        <Route path="/freelancer" element={<FreelancerDashboard />} />
                    </Route>

                    {/* Customer Routes */}
                    <Route element={<RoleBasedRoute allowedRoles={['customer', 'admin']} />}>
                        <Route path="/dashboard" element={<CustomerDashboard />} />
                    </Route>

                    {/* Default Redirect */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
