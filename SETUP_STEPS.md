# Setup Steps - Ocean View Resort Hotel Reservation System

Follow these steps in order to set up and run the application:

## Prerequisites Check

Ensure you have installed:
- ✅ Java JDK 17 or higher
- ✅ Maven 3.6+
- ✅ Node.js 16+ and npm
- ✅ MySQL 8.0+
- ✅ Git (optional)

## Step-by-Step Setup

### STEP 1: Database Setup

1. **Start MySQL Server**
   - Make sure MySQL service is running on your system

2. **Create Database (Choose one method)**

   **Method A: Automatic (Recommended)**
   - The database will be created automatically when you run the Spring Boot application
   - Just ensure MySQL is running

   **Method B: Manual**
   ```bash
   mysql -u root -p
   ```
   Then run:
   ```sql
   CREATE DATABASE hotel_reservation_db;
   ```

3. **Update Database Credentials**
   - Open: `backend/src/main/resources/application.properties`
   - Update these lines with your MySQL credentials:
     ```properties
     spring.datasource.username=root
     spring.datasource.password=YOUR_MYSQL_PASSWORD
     ```

### STEP 2: Backend Setup

1. **Open Terminal/Command Prompt**

2. **Navigate to backend directory**
   ```bash
   cd hotel-room-reservation-system/backend
   ```

3. **Build the project**
   ```bash
   mvn clean install
   ```
   *This may take a few minutes on first run as Maven downloads dependencies*

4. **Run the Spring Boot application**
   ```bash
   mvn spring-boot:run
   ```

5. **Verify Backend is Running**
   - You should see: "Started HotelReservationApplication"
   - Backend runs on: `http://localhost:8080`
   - Default admin user is automatically created:
     - Username: `admin`
     - Password: `admin123`

6. **Keep this terminal open** - Backend must stay running

### STEP 3: Frontend Setup

1. **Open a NEW Terminal/Command Prompt** (keep backend running)

2. **Navigate to frontend directory**
   ```bash
   cd hotel-room-reservation-system/frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```
   *This may take a few minutes on first run*

4. **Start the React development server**
   ```bash
   npm start
   ```

5. **Verify Frontend is Running**
   - Browser should automatically open to `http://localhost:3000`
   - If not, manually navigate to: `http://localhost:3000`

### STEP 4: Login and Test

1. **Login Page**
   - Username: `admin`
   - Password: `admin123`

2. **Test Features**
   - ✅ View Dashboard with statistics
   - ✅ Add/Edit/Delete Rooms
   - ✅ Add/Edit/Delete Customers
   - ✅ Create/Edit/Cancel Bookings
   - ✅ View booking calculations

## Quick Start Commands Summary

### Terminal 1 (Backend):
```bash
cd hotel-room-reservation-system/backend
mvn spring-boot:run
```

### Terminal 2 (Frontend):
```bash
cd hotel-room-reservation-system/frontend
npm start
```

## Troubleshooting

### Backend won't start
- ✅ Check MySQL is running
- ✅ Verify database credentials in `application.properties`
- ✅ Check if port 8080 is available
- ✅ Ensure Java 17+ is installed: `java -version`

### Frontend won't start
- ✅ Check Node.js is installed: `node -v`
- ✅ Delete `node_modules` and run `npm install` again
- ✅ Check if port 3000 is available

### Database connection errors
- ✅ Verify MySQL service is running
- ✅ Check username/password in `application.properties`
- ✅ Ensure database exists or auto-create is enabled

### CORS errors in browser
- ✅ Ensure backend is running on port 8080
- ✅ Check browser console for specific error messages

## Project Structure

```
hotel-room-reservation-system/
├── backend/          # Spring Boot application
├── frontend/         # React application
├── database/         # SQL schema file
├── README.md         # Full documentation
└── SETUP_STEPS.md    # This file
```

## Default Credentials

- **Username**: admin
- **Password**: admin123

## Next Steps After Setup

1. ✅ Login to the admin dashboard
2. ✅ Add some rooms (Standard, Deluxe, Suite, Family)
3. ✅ Add customers
4. ✅ Create bookings and see automatic billing calculation
5. ✅ Explore all features!

---

**Need Help?** Check the main `README.md` for detailed documentation.
