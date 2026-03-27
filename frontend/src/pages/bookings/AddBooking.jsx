import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../../services/bookingService';
import { getCustomers } from '../../services/customerService';
import { getAvailableRoomsByCategory } from '../../services/roomService';

const AddBooking = () => {
  const [formData, setFormData] = useState({
    customerId: '',
    roomId: '',
    category: '',
    checkInDate: '',
    checkOutDate: '',
  });
  const [customers, setCustomers] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [totalNights, setTotalNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (formData.category) {
      fetchAvailableRooms();
    } else {
      setAvailableRooms([]);
    }
  }, [formData.category]);

  useEffect(() => {
    if (formData.roomId) {
      const room = availableRooms.find((r) => r.id === parseInt(formData.roomId));
      setSelectedRoom(room);
    } else {
      setSelectedRoom(null);
    }
  }, [formData.roomId, availableRooms]);

  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate && selectedRoom) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      setTotalNights(nights > 0 ? nights : 0);
      setTotalPrice(nights > 0 ? nights * selectedRoom.pricePerNight : 0);
    } else {
      setTotalNights(0);
      setTotalPrice(0);
    }
  }, [formData.checkInDate, formData.checkOutDate, selectedRoom]);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchAvailableRooms = async () => {
    try {
      const response = await getAvailableRoomsByCategory(formData.category);
      setAvailableRooms(response.data);
      setFormData({ ...formData, roomId: '' });
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!formData.customerId) {
      alert('Please select a customer');
      return false;
    }

    if (!formData.category) {
      alert('Please select a room category');
      return false;
    }

    if (!formData.roomId) {
      alert('Please select a room');
      return false;
    }

    if (!formData.checkInDate) {
      alert('Please select a check-in date');
      return false;
    }

    if (!formData.checkOutDate) {
      alert('Please select a check-out date');
      return false;
    }

    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      alert('Check-in date cannot be in the past');
      return false;
    }

    if (checkOut <= checkIn) {
      alert('Check-out date must be after check-in date');
      return false;
    }

    if (totalNights <= 0) {
      alert('Check-out date must be after check-in date');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      await createBooking({
        customer: { id: parseInt(formData.customerId) },
        room: { id: parseInt(formData.roomId) },
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        totalPrice: totalPrice,
        status: 'Confirmed',
      });
      navigate('/bookings');
    } catch (error) {
      alert('Error creating booking: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Create New Booking</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Customer *</label>
          <select
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} {customer.email ? `(${customer.email})` : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Room Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
            <option value="Family">Family</option>
          </select>
        </div>

        {formData.category && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Available Room *</label>
            <select
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select Room</option>
              {availableRooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.roomNumber} - LKR {room.pricePerNight}/night (Capacity: {room.capacity})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Check-In Date *</label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Check-Out Date *</label>
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            min={formData.checkInDate || new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        {totalNights > 0 && (
          <div className="mb-4 p-4 bg-blue-50 rounded">
            <h3 className="font-bold mb-2">Booking Summary</h3>
            <p>Total Nights: <strong>{totalNights}</strong></p>
            <p>Price per Night: <strong>LKR {selectedRoom?.pricePerNight?.toFixed(2) || '0.00'}</strong></p>
            <p className="text-xl font-bold text-blue-600">
              Total Price: LKR {totalPrice.toFixed(2)}
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Create Booking
          </button>
          <button
            type="button"
            onClick={() => navigate('/bookings')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBooking;
