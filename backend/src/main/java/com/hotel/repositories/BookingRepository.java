package com.hotel.repositories;

import com.hotel.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerId(Long customerId);
    List<Booking> findByRoomId(Long roomId);
    List<Booking> findByCheckInDateBetween(LocalDate start, LocalDate end);
}
