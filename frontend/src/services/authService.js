import api from './api';

export const login = async (usernameOrEmail, password) => {
  const response = await api.post('/auth/login', { usernameOrEmail, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const registerStaff = async (username, password, email, role = 'STAFF') => {
  const response = await api.post('/auth/register', { username, password, email, role });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getUserRole = () => {
  const user = getCurrentUser();
  return user ? user.role : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const isAdmin = () => {
  return getUserRole() === 'ADMIN';
};
