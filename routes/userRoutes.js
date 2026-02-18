const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// POST - Login
router.post("/login", loginController);

// POST - Register
router.post("/register", registerController);

// POST - Get User Data (Auth)
router.post("/getUserData", authMiddleware, authController);

// POST - Apply Doctor
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// POST - Mark All Notifications Read
router.post("/get-all-notification", authMiddleware, getAllNotificationController);

// POST - Delete All Notifications
router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController);

// GET - Get All Approved Doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// POST - Book Appointment
router.post("/book-appointment", authMiddleware, bookAppointmentController);

// POST - Check Booking Availability
router.post("/booking-availability", authMiddleware, bookingAvailabilityController);

// GET - User Appointments
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;
