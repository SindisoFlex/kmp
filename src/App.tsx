import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import RoleBasedRoute from './components/auth/RoleBasedRoute';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Gallery from './pages/public/Gallery';
import CustomerLogin from './pages/public/Login';
import Register from './pages/auth/Register';

// Portals Login
import StaffLogin from './pages/auth/StaffLogin';

// Dashboards
import AdminDashboard from './pages/admin/AdminDashboard';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import FreelancerDashboard from './pages/freelancer/FreelancerDashboard';
import StaffDashboard from './pages/staff/StaffDashboard';

// User Dashboard Sub-pages
import MyBookings from './pages/customer/dashboard/MyBookings';
import Profile from './pages/customer/dashboard/Profile';
import Messages from './pages/customer/dashboard/Messages';
import MyFiles from './pages/customer/dashboard/MyFiles';
import ServiceList from './pages/customer/services/ServiceList';

function App() {
    return (
        <AuthProvider>
            <BookingProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/login" element={<CustomerLogin />} />
                        <Route path="/register" element={<Register />} />

                        {/* Portal Login Routes (Private Links) */}
                        <Route path="/staff/login" element={<StaffLogin portalRole="staff" />} />
                        <Route path="/freelancer/login" element={<StaffLogin portalRole="freelancer" />} />
                        <Route path="/admin/login" element={<StaffLogin portalRole="admin" />} />

                        {/* Protected Admin Routes */}
                        <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
                            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        </Route>

                        {/* Protected Staff Routes */}
                        <Route element={<RoleBasedRoute allowedRoles={['staff', 'admin']} />}>
                            <Route path="/staff" element={<Navigate to="/staff/dashboard" replace />} />
                            <Route path="/staff/dashboard" element={<StaffDashboard />} />
                        </Route>

                        {/* Protected Freelancer Routes */}
                        <Route element={<RoleBasedRoute allowedRoles={['freelancer', 'admin']} />}>
                            <Route path="/freelancer" element={<Navigate to="/freelancer/dashboard" replace />} />
                            <Route path="/freelancer/dashboard" element={<FreelancerDashboard />} />
                        </Route>

                        {/* Protected Customer Routes */}
                        <Route element={<RoleBasedRoute allowedRoles={['customer', 'admin']} />}>
                            <Route path="/dashboard" element={<CustomerDashboard />}>
                                <Route index element={<Navigate to="/dashboard/book" replace />} />
                                <Route path="book" element={<ServiceList />} />
                                <Route path="bookings" element={<MyBookings />} />
                                <Route path="gallery" element={<MyFiles />} />
                                <Route path="messages" element={<Messages />} />
                                <Route path="profile" element={<Profile />} />
                            </Route>
                        </Route>

                        {/* Default Redirect */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </BookingProvider>
        </AuthProvider>
    );
}

export default App;
