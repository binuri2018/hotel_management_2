import api from './api';

export const getBookings = () => api.get('/bookings');
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const createBooking = (booking) => api.post('/bookings', booking);
export const updateBooking = (id, booking) => api.put(`/bookings/${id}`, booking);
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);
export const getBookingsByCustomer = (customerId) => api.get(`/bookings/customer/${customerId}`);
