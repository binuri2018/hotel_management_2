import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { isAuthenticated } from './services/authService';
import ProtectedRoute, { AdminRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RoomsList from './pages/rooms/RoomsList';
import AddRoom from './pages/rooms/AddRoom';
import EditRoom from './pages/rooms/EditRoom';
import CustomerList from './pages/customers/CustomerList';
import AddCustomer from './pages/customers/AddCustomer';
import EditCustomer from './pages/customers/EditCustomer';
import BookingList from './pages/bookings/BookingList';
import AddBooking from './pages/bookings/AddBooking';
import EditBooking from './pages/bookings/EditBooking';
import StaffList from './pages/staff/StaffList';
import AddStaff from './pages/staff/AddStaff';

// MUI Theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />}
          />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Box sx={{ display: 'flex' }}>
                  {/* Sidebar */}
                  <Sidebar />

                  {/* Main Content */}
                  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    {/* Navbar */}
                    <Navbar />

                    {/* Pages */}
                    <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/rooms" element={<RoomsList />} />
                        <Route path="/rooms/add" element={<AddRoom />} />
                        <Route path="/rooms/edit/:id" element={<EditRoom />} />
                        <Route path="/customers" element={<CustomerList />} />
                        <Route path="/customers/add" element={<AddCustomer />} />
                        <Route path="/customers/edit/:id" element={<EditCustomer />} />
                        <Route path="/bookings" element={<BookingList />} />
                        <Route path="/bookings/add" element={<AddBooking />} />
                        <Route path="/bookings/edit/:id" element={<EditBooking />} />
                        {/* Admin-only routes */}
                        <Route path="/staff" element={<AdminRoute><StaffList /></AdminRoute>} />
                        <Route path="/staff/add" element={<AdminRoute><AddStaff /></AdminRoute>} />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      </Routes>
                    </Box>
                  </Box>
                </Box>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;