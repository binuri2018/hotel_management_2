import api from './api';

export const getRooms = () => api.get('/rooms');
export const getRoomById = (id) => api.get(`/rooms/${id}`);
export const createRoom = (room) => api.post('/rooms', room);
export const updateRoom = (id, room) => api.put(`/rooms/${id}`, room);
export const deleteRoom = (id) => api.delete(`/rooms/${id}`);
export const getAvailableRooms = () => api.get('/rooms/available');
export const getRoomsByCategory = (category) => api.get(`/rooms/category/${category}`);
export const getAvailableRoomsByCategory = (category) => api.get(`/rooms/available/category/${category}`);
