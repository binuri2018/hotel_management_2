import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../../services/roomService';

const AddRoom = () => {
  const [formData, setFormData] = useState({
    roomNumber: '',
    category: 'Standard',
    pricePerNight: '',
    capacity: '',
    status: 'Available',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.roomNumber.trim()) {
      newErrors.roomNumber = 'Room number is required';
    } else if (formData.roomNumber.trim().length < 2) {
      newErrors.roomNumber = 'Room number must be at least 2 characters';
    }

    if (!formData.pricePerNight) {
      newErrors.pricePerNight = 'Price per night is required';
    } else if (parseFloat(formData.pricePerNight) <= 0) {
      newErrors.pricePerNight = 'Price must be greater than 0';
    } else if (parseFloat(formData.pricePerNight) > 1000000) {
      newErrors.pricePerNight = 'Price is too high';
    }

    if (!formData.capacity) {
      newErrors.capacity = 'Capacity is required';
    } else if (parseInt(formData.capacity) < 1) {
      newErrors.capacity = 'Capacity must be at least 1';
    } else if (parseInt(formData.capacity) > 10) {
      newErrors.capacity = 'Capacity cannot exceed 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      await createRoom({
        ...formData,
        pricePerNight: parseFloat(formData.pricePerNight),
        capacity: parseInt(formData.capacity),
      });
      navigate('/rooms');
    } catch (error) {
      alert('Error creating room: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Add New Room</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Room Number *</label>
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.roomNumber ? 'border-red-500' : ''}`}
            required
          />
          {errors.roomNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.roomNumber}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
            <option value="Family">Family</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Price Per Night (LKR) *</label>
          <input
            type="number"
            name="pricePerNight"
            value={formData.pricePerNight}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.pricePerNight ? 'border-red-500' : ''}`}
            step="0.01"
            min="0"
            required
          />
          {errors.pricePerNight && (
            <p className="text-red-500 text-sm mt-1">{errors.pricePerNight}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Capacity *</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.capacity ? 'border-red-500' : ''}`}
            min="1"
            max="10"
            required
          />
          {errors.capacity && (
            <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Create Room
          </button>
          <button
            type="button"
            onClick={() => navigate('/rooms')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
