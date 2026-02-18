# 🏥 Doctor Appointment System — How To Run

## Prerequisites
- Node.js installed (https://nodejs.org) → LTS version
- MongoDB Atlas account (free) OR local MongoDB

---

## Step 1 — Setup MongoDB

### Option A: MongoDB Atlas (Recommended - Free Cloud)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free M0 cluster
4. Go to: Security → Database Access → Add user (username + password)
5. Go to: Security → Network Access → Add IP Address → Allow from anywhere (0.0.0.0/0)
6. Go to: Deployment → Database → Connect → Drivers
7. Copy the connection string,
   
### Option B: Local MongoDB
- Install from https://www.mongodb.com/try/download/community
- URL = mongodb://localhost:27017

---

## Step 2 — Configure .env

Open the `.env` file in the root folder and fill in your values:

```
PORT = 8080
NODE_MODE = development
MONGO_URL = paste here connection string from mongoDb cluster/doctorApp
JWT_SECRET = anysecretrandomstring123456
```

⚠️  Replace MONGO_URL with your actual connection string!

---

## Step 3 — Install Backend Dependencies

Open terminal in the ROOT folder (where server.js is):

```bash
npm install
```

---

## Step 4 — Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

---

## Step 5 — Create Admin User

After you start the app, register a normal user via the Register page.
Then go to your MongoDB (Atlas or Compass) and update that user:
- Set `isAdmin` to `true`

OR use MongoDB Compass / Atlas to insert directly:
```json
{
  "name": "Admin",
  "email": "admin@test.com",
  "password": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  "isAdmin": true,
  "isDoctor": false,
  "notification": [],
  "seenNotification": []
}
```
(Password above is: `password123`)

---

## Step 6 — Run the Project

From the ROOT folder, run BOTH servers together:

```bash
npm run dev
```

This starts:
- ✅ Backend: http://localhost:8080
- ✅ Frontend: http://localhost:3000

---

## Step 7 — Open Browser

Go to: http://localhost:3000

---

## Project Features
- 👤 User Registration & Login
- 🏠 Home page with all approved doctors
- 📋 Apply to become a doctor
- 📅 Book appointments with doctors
- 🔔 Notification system
- 👨‍⚕️ Doctor profile management
- 🛡️ Admin dashboard (manage users & doctors)
- ✅ Approve/reject doctor applications

---

## File Structure
```
doctor-appointment-system/       ← ROOT (backend)
├── .env                         ← Your configuration (edit this!)
├── server.js                    ← Main entry point
├── package.json
├── config/db.js                 ← MongoDB connection
├── controllers/
│   ├── adminCtrl.js
│   ├── doctorCtrl.js
│   └── userCtrl.js
├── middlewares/authMiddleware.js
├── models/
│   ├── appointmentModel.js
│   ├── doctorModel.js
│   └── userModels.js
├── routes/
│   ├── adminRoutes.js
│   ├── doctorRoutes.js
│   └── userRoutes.js
└── client/                      ← Frontend (React)
    ├── package.json             ← Has proxy to backend
    ├── public/index.html
    └── src/
        ├── App.js
        ├── index.js
        ├── index.css
        ├── components/
        │   ├── DoctorList.js
        │   ├── Layout.js
        │   ├── ProtectedRoute.js
        │   ├── PublicRoute.js
        │   └── Spinner.js
        ├── Data/data.js
        ├── pages/
        │   ├── LoginPage.js
        │   ├── Register.js
        │   ├── HomePage.js
        │   ├── ApplyDoctor.js
        │   ├── Appointments.js
        │   ├── BookingPage.js
        │   ├── NotificationPage.js
        │   ├── admin/
        │   │   ├── Doctors.js
        │   │   └── Users.js
        │   └── doctor/
        │       ├── DoctorAppointments.js
        │       └── Profile.js
        ├── redux/
        │   ├── store.js
        │   └── features/
        │       ├── alertSlice.js
        │       └── userSlice.js
        └── styles/
            ├── LayoutStyles.css
            └── RegisterStyles.css
```
