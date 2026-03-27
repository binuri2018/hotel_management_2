# Ocean View Resort – Hotel Room Reservation Management System

A full-stack web application for managing hotel room reservations with a 3-tier distributed architecture.

## 🏗️ Architecture

- **Frontend**: React with React Router, Axios, and Tailwind CSS
- **Backend**: Spring Boot with Spring Data JPA, Spring Security (JWT)
- **Database**: MySQL

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java JDK 17** or higher
- **Maven 3.6+**
- **Node.js 16+** and npm
- **MySQL 8.0+**
- **Git**

## 🚀 Setup Instructions

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd hotel-room-reservation-system
```

### Step 2: Database Setup

1. **Start MySQL Server**

2. **Create the Database**

   Option 1: Run the SQL script
   ```bash
   mysql -u root -p < database/schema.sql
   ```

   Option 2: The database will be created automatically when you run the Spring Boot application (if `createDatabaseIfNotExist=true` is set in `application.properties`)

3. **Update Database Credentials**

   Edit `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   ```

### Step 3: Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Build the project**
   ```bash
   mvn clean install
   ```

3. **Run the Spring Boot application**
   ```bash
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

   **Note**: The default admin user is automatically created:
   - Username: `admin`
   - Password: `admin123`

### Step 4: Frontend Setup

1. **Open a new terminal and navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the React development server**
   ```bash
   npm start
   ```

   The frontend will start on `http://localhost:3000`

## 🔐 Default Login Credentials

- **Username**: `admin`
- **Password**: `admin123`

## 📁 Project Structure

```
hotel-room-reservation-system/
├── backend/
│   └── src/main/java/com/hotel/
│       ├── controllers/      # REST Controllers
│       ├── services/         # Business Logic
│       ├── repositories/     # Data Access Layer
│       ├── models/           # JPA Entities
│       ├── config/           # Security & JWT Config
│       └── dto/              # Data Transfer Objects
├── frontend/
│   └── src/
│       ├── components/       # Reusable Components
│       ├── pages/            # Page Components
│       ├── services/         # API Services
│       └── App.js            # Main App Component
├── database/
│   └── schema.sql            # Database Schema
└── README.md
```

## 🎯 Features

### Authentication Module
- ✅ Admin login with JWT token
- ✅ Protected routes
- ✅ Secure logout

### Room Management
- ✅ Add, view, update, delete rooms
- ✅ Room categories: Standard, Deluxe, Suite, Family
- ✅ Room status: Available, Occupied, Maintenance
- ✅ Filter by category and availability

### Customer Management
- ✅ Add, view, update, delete customers
- ✅ Search customers by name
- ✅ Customer information: name, email, phone, address

### Booking Management
- ✅ Create, view, update, cancel bookings
- ✅ Automatic billing calculation
- ✅ Room availability checking
- ✅ Date validation
- ✅ Total price calculation (nights × price per night)

### Dashboard
- ✅ Statistics overview
- ✅ Total rooms, available rooms
- ✅ Total customers and bookings
- ✅ Revenue tracking

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/{id}` - Get room by ID
- `POST /api/rooms` - Create room
- `PUT /api/rooms/{id}` - Update room
- `DELETE /api/rooms/{id}` - Delete room
- `GET /api/rooms/available` - Get available rooms
- `GET /api/rooms/category/{category}` - Get rooms by category
- `GET /api/rooms/available/category/{category}` - Get available rooms by category

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/{id}` - Get customer by ID
- `POST /api/customers` - Create customer
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer
- `GET /api/customers/search?name={name}` - Search customers

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/{id}` - Get booking by ID
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/{id}` - Update booking
- `DELETE /api/bookings/{id}` - Cancel booking
- `GET /api/bookings/customer/{customerId}` - Get bookings by customer

## 🧪 Testing the API

You can test the API endpoints using Postman or any REST client:

1. **Login** to get JWT token:
   ```
   POST http://localhost:8080/api/auth/login
   Body: {
     "username": "admin",
     "password": "admin123"
   }
   ```

2. **Use the token** in subsequent requests:
   ```
   Authorization: Bearer <your-token>
   ```

## 🛠️ Technologies Used

### Backend
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security
- JWT (jjwt 0.12.3)
- MySQL Connector
- Lombok
- Maven

### Frontend
- React 18.2.0
- React Router 6.20.0
- Axios 1.6.2
- Tailwind CSS 3.3.6

## 📝 Design Patterns Implemented

- ✅ **MVC Pattern**: Model (Entities) → View (React UI) → Controller (REST APIs)
- ✅ **Repository Pattern**: Database operations through Spring Data JPA
- ✅ **Service Layer Pattern**: Business logic separation
- ✅ **DTO Pattern**: Data transfer between frontend and backend

## 🐛 Troubleshooting

### Backend Issues

1. **Port 8080 already in use**
   - Change `server.port` in `application.properties`

2. **Database connection error**
   - Verify MySQL is running
   - Check credentials in `application.properties`
   - Ensure database exists

3. **JWT errors**
   - Check JWT secret in `application.properties`
   - Verify token is being sent in Authorization header

### Frontend Issues

1. **CORS errors**
   - Ensure backend CORS configuration allows `http://localhost:3000`
   - Check backend is running on port 8080

2. **API connection errors**
   - Verify backend is running
   - Check API base URL in `src/services/api.js`

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Development

### Running in Development Mode

**Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm start
```

### Building for Production

**Backend:**
```bash
cd backend
mvn clean package
java -jar target/hotel-reservation-backend-1.0.0.jar
```

**Frontend:**
```bash
cd frontend
npm run build
```

## 🎉 Next Steps

1. Start MySQL server
2. Run the backend application
3. Run the frontend application
4. Login with admin credentials
5. Start managing rooms, customers, and bookings!

---

**Happy Coding! 🚀**
