import api from './api';

const staffService = {
  getAllStaff: async () => {
    const response = await api.get('/staff');
    return response.data;
  },

  getStaffById: async (id) => {
    const response = await api.get(`/staff/${id}`);
    return response.data;
  },

  updateStaff: async (id, data) => {
    const response = await api.put(`/staff/${id}`, data);
    return response.data;
  },

  deleteStaff: async (id) => {
    const response = await api.delete(`/staff/${id}`);
    return response.data;
  },
};

export default staffService;
