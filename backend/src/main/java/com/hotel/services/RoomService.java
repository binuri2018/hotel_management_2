package com.hotel.services;

import com.hotel.models.Room;
import com.hotel.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, Room roomDetails) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));

        room.setRoomNumber(roomDetails.getRoomNumber());
        room.setCategory(roomDetails.getCategory());
        room.setPricePerNight(roomDetails.getPricePerNight());
        room.setCapacity(roomDetails.getCapacity());
        room.setStatus(roomDetails.getStatus());

        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
        roomRepository.delete(room);
    }

    public List<Room> getAvailableRooms() {
        return roomRepository.findByStatus("Available");
    }

    public List<Room> getRoomsByCategory(String category) {
        return roomRepository.findByCategory(category);
    }

    public List<Room> getAvailableRoomsByCategory(String category) {
        return roomRepository.findByCategoryAndStatus(category, "Available");
    }
}
