const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
} = require("../controllers/doctorCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// POST - Get Doctor Info
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

// POST - Update Doctor Profile
router.post("/updateProfile", authMiddleware, updateProfileController);

// POST - Get Single Doctor By Id
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

// GET - Doctor Appointments
router.get("/doctor-appointments", authMiddleware, doctorAppointmentsController);

// POST - Update Appointment Status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
