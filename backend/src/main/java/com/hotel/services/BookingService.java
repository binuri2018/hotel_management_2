package com.hotel.services;

import com.hotel.models.Booking;
import com.hotel.models.Customer;
import com.hotel.models.Room;
import com.hotel.repositories.BookingRepository;
import com.hotel.repositories.CustomerRepository;
import com.hotel.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RoomRepository roomRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public Booking createBooking(Booking booking) {
        // Validate customer exists
        Customer customer = customerRepository.findById(booking.getCustomer().getId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // Validate room exists and is available
        Room room = roomRepository.findById(booking.getRoom().getId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (!"Available".equals(room.getStatus())) {
            throw new RuntimeException("Room is not available");
        }

        // Calculate total price
        long nights = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
        if (nights <= 0) {
            throw new RuntimeException("Check-out date must be after check-in date");
        }

        double totalPrice = nights * room.getPricePerNight();
        booking.setTotalPrice(totalPrice);

        // Set customer and room
        booking.setCustomer(customer);
        booking.setRoom(room);

        // Update room status to Occupied
        room.setStatus("Occupied");
        roomRepository.save(room);

        return bookingRepository.save(booking);
    }

    public Booking updateBooking(Long id, Booking bookingDetails) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));

        // Update dates if changed
        if (bookingDetails.getCheckInDate() != null) {
            booking.setCheckInDate(bookingDetails.getCheckInDate());
        }
        if (bookingDetails.getCheckOutDate() != null) {
            booking.setCheckOutDate(bookingDetails.getCheckOutDate());
        }

        // Recalculate total price if dates changed
        if (bookingDetails.getCheckInDate() != null || bookingDetails.getCheckOutDate() != null) {
            long nights = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
            if (nights <= 0) {
                throw new RuntimeException("Check-out date must be after check-in date");
            }
            booking.setTotalPrice(nights * booking.getRoom().getPricePerNight());
        }

        if (bookingDetails.getStatus() != null) {
            booking.setStatus(bookingDetails.getStatus());
        }

        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));

        // Update room status back to Available
        Room room = booking.getRoom();
        room.setStatus("Available");
        roomRepository.save(room);

        bookingRepository.delete(booking);
    }

    public List<Booking> getBookingsByCustomer(Long customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    public List<Booking> getBookingsByDateRange(LocalDate start, LocalDate end) {
        return bookingRepository.findByCheckInDateBetween(start, end);
    }
}
