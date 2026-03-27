package com.hotel.repositories;

import com.hotel.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByStatus(String status);
    List<Room> findByCategory(String category);
    List<Room> findByCategoryAndStatus(String category, String status);
}
