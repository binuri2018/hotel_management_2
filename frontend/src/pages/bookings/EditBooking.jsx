import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookingById, updateBooking } from '../../services/bookingService';
import { getCustomers } from '../../services/customerService';
import { getRooms } from '../../services/roomService';

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerId: '',
    roomId: '',
    checkInDate: '',
    checkOutDate: '',
    status: 'Confirmed',
  });
  const [customers, setCustomers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalNights, setTotalNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (formData.roomId) {
      const room = rooms.find((r) => r.id === parseInt(formData.roomId));
      setSelectedRoom(room);
    }
  }, [formData.roomId, rooms]);

  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate && selectedRoom) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      setTotalNights(nights > 0 ? nights : 0);
      setTotalPrice(nights > 0 ? nights * selectedRoom.pricePerNight : 0);
    }
  }, [formData.checkInDate, formData.checkOutDate, selectedRoom]);

  const fetchData = async () => {
    try {
      const [bookingRes, customersRes, roomsRes] = await Promise.all([
        getBookingById(id),
        getCustomers(),
        getRooms(),
      ]);

      const booking = bookingRes.data;
      setFormData({
        customerId: booking.customer?.id?.toString() || '',
        roomId: booking.room?.id?.toString() || '',
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        status: booking.status,
      });

      setCustomers(customersRes.data);
      setRooms(roomsRes.data);
    } catch (error) {
      alert('Error fetching booking data');
    } finally {
      setLoading(false);
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
      await updateBooking(id, {
        customer: { id: parseInt(formData.customerId) },
        room: { id: parseInt(formData.roomId) },
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        status: formData.status,
      });
      navigate('/bookings');
    } catch (error) {
      alert('Error updating booking: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Booking</h1>
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
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Room *</label>
          <select
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.roomNumber} - {room.category} (LKR {room.pricePerNight}/night)
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Check-In Date *</label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
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
            min={formData.checkInDate}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Status *</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
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
            Update Booking
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

export default EditBooking;
