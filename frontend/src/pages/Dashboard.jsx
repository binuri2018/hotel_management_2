import React, { useState, useEffect } from 'react';
import { getRooms } from '../services/roomService';
import { getCustomers } from '../services/customerService';
import { getBookings } from '../services/bookingService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    totalCustomers: 0,
    totalBookings: 0,
    todayBookings: 0,
    totalRevenue: 0,
  });
  const [roomAvailability, setRoomAvailability] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [roomsRes, customersRes, bookingsRes] = await Promise.all([
        getRooms(),
        getCustomers(),
        getBookings(),
      ]);

      const rooms = roomsRes.data;
      const customers = customersRes.data;
      const bookings = bookingsRes.data;

      const today = new Date().toISOString().split('T')[0];
      const todayBookings = bookings.filter(
        (b) => b.checkInDate === today || b.checkOutDate === today
      );

      const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

      // Calculate room availability by category
      const availabilityByCategory = {};
      const categories = ['Standard', 'Deluxe', 'Suite', 'Family'];
      
      categories.forEach(category => {
        const categoryRooms = rooms.filter(r => r.category === category);
        const available = categoryRooms.filter(r => r.status === 'Available').length;
        const total = categoryRooms.length;
        availabilityByCategory[category] = {
          available,
          total,
          occupied: total - available
        };
      });

      setRoomAvailability(availabilityByCategory);
      setStats({
        totalRooms: rooms.length,
        availableRooms: rooms.filter((r) => r.status === 'Available').length,
        totalCustomers: customers.length,
        totalBookings: bookings.length,
        todayBookings: todayBookings.length,
        totalRevenue: totalRevenue,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  const statCards = [
    { label: 'Total Rooms', value: stats.totalRooms, color: 'bg-blue-500' },
    { label: 'Available Rooms', value: stats.availableRooms, color: 'bg-green-500' },
    { label: 'Total Customers', value: stats.totalCustomers, color: 'bg-purple-500' },
    { label: 'Total Bookings', value: stats.totalBookings, color: 'bg-yellow-500' },
    { label: "Today's Bookings", value: stats.todayBookings, color: 'bg-orange-500' },
    { label: 'Total Revenue', value: `LKR ${stats.totalRevenue.toFixed(2)}`, color: 'bg-red-500' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} text-white p-6 rounded-lg shadow-lg`}
          >
            <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Room Availability by Category */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Room Availability by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(roomAvailability).map(([category, data]) => (
            <div key={category} className="border border-gray-300 rounded-lg p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-3">{category}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-semibold">{data.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Available:</span>
                  <span className="font-semibold text-green-600">{data.available}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600">Occupied:</span>
                  <span className="font-semibold text-red-600">{data.occupied}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${data.total > 0 ? (data.available / data.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    {data.total > 0 ? Math.round((data.available / data.total) * 100) : 0}% Available
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
