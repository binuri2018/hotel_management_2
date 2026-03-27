import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRooms, deleteRoom } from '../../services/roomService';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await getRooms();
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await deleteRoom(id);
        fetchRooms();
      } catch (error) {
        alert('Error deleting room');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Occupied':
        return 'bg-red-100 text-red-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Room Management</h1>
        <button
          onClick={() => navigate('/rooms/add')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add New Room
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Room Number</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price/Night</th>
              <th className="px-4 py-2 border">Capacity</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{room.roomNumber}</td>
                <td className="px-4 py-2 border">{room.category}</td>
                <td className="px-4 py-2 border">LKR {room.pricePerNight}</td>
                <td className="px-4 py-2 border">{room.capacity}</td>
                <td className="px-4 py-2 border">
                  <span className={`px-2 py-1 rounded ${getStatusColor(room.status)}`}>
                    {room.status}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => navigate(`/rooms/edit/${room.id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomsList;
