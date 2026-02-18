# 🏥 Doctor Appointment System

A full-stack web application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) that enables patients to book appointments with doctors online, and allows doctors and administrators to manage the entire appointment workflow efficiently.

---

## 📌 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Usage Guide](#usage-guide)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Database Schema](#database-schema)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

---

## 📖 Project Overview

The **Doctor Appointment System** is a role-based healthcare management platform designed to digitize and streamline the process of scheduling medical appointments. The system eliminates the need for phone-based booking by providing an intuitive online platform where:

- **Patients** can browse available doctors and book appointments
- **Doctors** can manage their profiles and handle patient appointment requests
- **Administrators** can oversee the entire platform, approve doctor registrations, and manage users

This project was developed as part of an academic submission to demonstrate proficiency in full-stack web development using modern JavaScript technologies.

---

## ✨ Features

### 👤 Patient (User)
- Register and login securely with JWT authentication
- Browse all approved and available doctors
- View doctor details including specialization, experience, fees, and working hours
- Book appointments by selecting preferred date and time
- Check real-time appointment availability before booking
- View all personal appointments with status tracking
- Receive in-app notifications on appointment status updates
- Access personal profile information

### 👨‍⚕️ Doctor
- Apply for a doctor account through the platform
- Manage and update professional profile (specialization, fees, timings)
- View all incoming patient appointment requests
- Approve or reject appointment requests
- Patients are notified automatically upon status change

### 🛡️ Admin
- Access dedicated admin dashboard
- View and manage all registered users
- Review and approve or reject doctor applications
- Monitor all platform activity

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js 18, Redux Toolkit, React Router v6 |
| **UI Library** | Ant Design (AntD) v5, Bootstrap 5 |
| **State Management** | Redux Toolkit |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JSON Web Token (JWT), bcryptjs |
| **Date Handling** | Moment.js, Day.js |
| **HTTP Client** | Axios |
| **Dev Tools** | Nodemon, Concurrently, Morgan |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────┐
│                   CLIENT (React.js)                  │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────┐ │
│  │  Pages   │  │Components│  │  Redux Store       │ │
│  │ Login    │  │ Layout   │  │  - alertSlice      │ │
│  │ Register │  │ Sidebar  │  │  - userSlice       │ │
│  │ Home     │  │ DoctorCard│ │                    │ │
│  │ Booking  │  │ ProtRoute│  │                    │ │
│  └──────────┘  └──────────┘  └────────────────────┘ │
└─────────────────────┬───────────────────────────────┘
                      │ HTTP (Axios / REST API)
                      │ Proxy → localhost:8080
┌─────────────────────▼───────────────────────────────┐
│                SERVER (Express.js)                   │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────┐ │
│  │  Routes  │  │Controllers│ │    Middleware       │ │
│  │ /user    │  │ userCtrl │  │  authMiddleware     │ │
│  │ /doctor  │  │ doctorCtrl│ │  (JWT Verify)       │ │
│  │ /admin   │  │ adminCtrl│  │                    │ │
│  └──────────┘  └──────────┘  └────────────────────┘ │
└─────────────────────┬───────────────────────────────┘
                      │ Mongoose ODM
┌─────────────────────▼───────────────────────────────┐
│                 MongoDB Database                     │
│   ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│   │  users   │  │ doctors  │  │  appointments    │  │
│   └──────────┘  └──────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
doctor-appointment-system/
│
├── 📄 server.js                    # Express server entry point
├── 📄 package.json                 # Backend dependencies & scripts
├── 📄 .env                         # Environment variables (not committed)
├── 📄 .gitignore
│
├── 📁 config/
│   └── db.js                       # MongoDB connection setup
│
├── 📁 controllers/
│   ├── userCtrl.js                 # User, auth, booking logic
│   ├── doctorCtrl.js               # Doctor profile & appointments
│   └── adminCtrl.js                # Admin management logic
│
├── 📁 middlewares/
│   └── authMiddleware.js           # JWT token verification
│
├── 📁 models/
│   ├── userModels.js               # User schema
│   ├── doctorModel.js              # Doctor schema
│   └── appointmentModel.js         # Appointment schema
│
├── 📁 routes/
│   ├── userRoutes.js               # /api/v1/user/*
│   ├── doctorRoutes.js             # /api/v1/doctor/*
│   └── adminRoutes.js              # /api/v1/admin/*
│
└── 📁 client/                      # React Frontend
    ├── 📄 package.json             # Frontend dependencies
    │
    └── 📁 src/
        ├── App.js                  # Root component & routes
        ├── index.js                # React entry point
        ├── index.css               # Global styles
        │
        ├── 📁 components/
        │   ├── Layout.js           # Sidebar + Header wrapper
        │   ├── DoctorList.js       # Doctor card component
        │   ├── ProtectedRoute.js   # Auth guard for private routes
        │   ├── PublicRoute.js      # Redirect if logged in
        │   └── Spinner.js          # Loading overlay
        │
        ├── 📁 pages/
        │   ├── LoginPage.js        # Login form
        │   ├── Register.js         # Registration form
        │   ├── HomePage.js         # All available doctors
        │   ├── ApplyDoctor.js      # Doctor application form
        │   ├── BookingPage.js      # Book an appointment
        │   ├── Appointments.js     # Patient's appointments
        │   ├── NotificationPage.js # Notifications center
        │   ├── UserProfile.js      # User profile view
        │   │
        │   ├── 📁 admin/
        │   │   ├── Doctors.js      # Admin: manage doctors
        │   │   └── Users.js        # Admin: manage users
        │   │
        │   └── 📁 doctor/
        │       ├── Profile.js      # Doctor profile editor
        │       └── DoctorAppointments.js  # Doctor's appointments
        │
        ├── 📁 redux/
        │   ├── store.js            # Redux store configuration
        │   └── 📁 features/
        │       ├── alertSlice.js   # Loading state management
        │       └── userSlice.js    # Logged-in user state
        │
        ├── 📁 styles/
        │   ├── LayoutStyles.css    # Sidebar & layout styles
        │   └── RegisterStyles.css  # Auth form styles
        │
        └── 📁 Data/
            └── data.js             # Sidebar menu config per role
```

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure the following are installed on your machine:

- [Node.js](https://nodejs.org/) — v16 or higher (LTS recommended)
- [MongoDB](https://www.mongodb.com/) — Local installation **or** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free cloud account
- [Git](https://git-scm.com/) — for cloning the repository

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/doctor-appointment-system.git
cd doctor-appointment-system
```

---

### Step 2 — Configure Environment Variables

Create a `.env` file in the **root** folder (same level as `server.js`) and add the following:

```env
PORT = 8080
NODE_MODE = development
MONGO_URL = mongodb://localhost:27017/doctorapp
JWT_SECRET = your_super_secret_jwt_key_here
```

> ⚠️ For MongoDB Atlas, replace `MONGO_URL` with your Atlas connection string:
> `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/doctorapp`

---

### Step 3 — Install Backend Dependencies

```bash
# In the root folder
npm install
```

---

### Step 4 — Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

---

### Step 5 — Run the Application

```bash
# Runs both backend and frontend simultaneously
npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8080 |

---

### Step 6 — Create Admin Account

1. Register a new account at `http://localhost:3000/register`
2. Open **MongoDB Compass** and connect to your database
3. Navigate to `doctorapp → users`
4. Find your registered user and set `isAdmin: true`
5. Logout and login again — you now have admin access

Alternatively, using MongoDB shell:

```bash
mongosh
use doctorapp
db.users.updateOne({ email: "your@email.com" }, { $set: { isAdmin: true } })
```

---

## 🔐 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port for the Express server | `8080` |
| `NODE_MODE` | Application mode | `development` |
| `MONGO_URL` | MongoDB connection string | `mongodb://localhost:27017/doctorapp` |
| `JWT_SECRET` | Secret key for JWT token signing | `mysecretkey123` |

---

## 🚀 Usage Guide

### Complete Workflow

```
1. Patient registers an account
        ↓
2. Doctor registers an account → applies via "Apply Doctor"
        ↓
3. Admin logs in → approves the doctor application
        ↓
4. Doctor appears on the Home page for patients
        ↓
5. Patient books an appointment (selects date & time)
        ↓
6. Doctor logs in → views & approves the appointment
        ↓
7. Patient receives notification → appointment confirmed ✅
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Run frontend and backend concurrently |
| `npm run server` | Run backend only (with nodemon) |
| `npm run client` | Run frontend only |
| `npm start` | Run backend in production mode |

---

## 📡 API Endpoints

### User Routes — `/api/v1/user`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | Login and get JWT token | ❌ |
| POST | `/getUserData` | Get logged-in user data | ✅ |
| POST | `/apply-doctor` | Submit doctor application | ✅ |
| GET | `/getAllDoctors` | Get all approved doctors | ✅ |
| POST | `/book-appointment` | Book an appointment | ✅ |
| POST | `/booking-availability` | Check appointment availability | ✅ |
| GET | `/user-appointments` | Get all appointments for user | ✅ |
| POST | `/get-all-notification` | Mark all notifications as read | ✅ |
| POST | `/delete-all-notification` | Delete all read notifications | ✅ |

### Doctor Routes — `/api/v1/doctor`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/getDoctorInfo` | Get doctor profile by userId | ✅ |
| POST | `/updateProfile` | Update doctor profile | ✅ |
| POST | `/getDoctorById` | Get doctor by doctorId | ✅ |
| GET | `/doctor-appointments` | Get doctor's appointments | ✅ |
| POST | `/update-status` | Approve or reject appointment | ✅ |

### Admin Routes — `/api/v1/admin`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/getAllUsers` | Get all registered users | ✅ |
| GET | `/getAllDoctors` | Get all doctors | ✅ |
| POST | `/changeAccountStatus` | Approve or reject doctor | ✅ |

> ✅ = Requires Bearer Token in Authorization header

---

## 🗃️ Database Schema

### Users Collection
```json
{
  "name": "String (required)",
  "email": "String (required, unique)",
  "password": "String (hashed, required)",
  "isAdmin": "Boolean (default: false)",
  "isDoctor": "Boolean (default: false)",
  "notifcation": "Array (default: [])",
  "seennotification": "Array (default: [])",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Doctors Collection
```json
{
  "userId": "String (ref: users)",
  "firstName": "String (required)",
  "lastName": "String (required)",
  "phone": "String (required)",
  "email": "String (required)",
  "website": "String",
  "address": "String (required)",
  "specialization": "String (required)",
  "experience": "String (required)",
  "feesPerConsultation": "Number (required)",
  "status": "String (pending | approved | rejected)",
  "timings": "Array [startTime, endTime]",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Appointments Collection
```json
{
  "userId": "String (ref: users)",
  "doctorId": "String (ref: doctors)",
  "doctorInfo": "Object (snapshot)",
  "userInfo": "Object (snapshot)",
  "date": "String (ISO format)",
  "time": "String (ISO format)",
  "status": "String (pending | approved | reject)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## 🔮 Future Enhancements

- [ ] Email notifications via Nodemailer (appointment confirmation emails)
- [ ] Payment gateway integration (Razorpay / Stripe) for consultation fees
- [ ] Video consultation feature using WebRTC
- [ ] Doctor availability calendar with blocked dates
- [ ] Patient medical history and records management
- [ ] Mobile responsive PWA (Progressive Web App)
- [ ] Search and filter doctors by specialization or location
- [ ] Admin analytics dashboard with charts
- [ ] Password reset via email OTP
- [ ] Multi-language support (i18n)

---

## 🧰 Dependencies

### Backend
```json
{
  "bcryptjs": "^2.4.3",
  "colors": "^1.4.0",
  "concurrently": "^8.2.2",
  "dotenv": "^16.4.2",
  "express": "^4.18.2",
  "jsonwebtoken": "^9.0.2",
  "moment": "^2.30.1",
  "mongoose": "^8.1.1",
  "morgan": "^1.10.0",
  "nodemon": "^3.0.3"
}
```

### Frontend
```json
{
  "antd": "^5.14.0",
  "axios": "^1.6.7",
  "dayjs": "^1.11.10",
  "moment": "^2.30.1",
  "react": "^18.2.0",
  "react-redux": "^9.1.0",
  "@reduxjs/toolkit": "^2.2.1",
  "react-router-dom": "^6.22.0"
}
```

---

## 👨‍💻 Author

**Your Name**
B.Tech Computer Science & Engineering
Roll No: XXXXXXXX
Academic Year: 2025–2026

> *This project was developed as part of the academic curriculum to demonstrate full-stack web development skills using the MERN stack.*

---

## 📄 License

This project is submitted for academic purposes only. All rights reserved © 2026.

---

<div align="center">
  <p>Built with ❤️ using the MERN Stack</p>
  <p>MongoDB • Express.js • React.js • Node.js</p>
</div>
