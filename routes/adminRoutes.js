const express = require("express");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// GET - All Users
router.get("/getAllUsers", authMiddleware, getAllUsersController);

// GET - All Doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// POST - Change Doctor Account Status
router.post("/changeAccountStatus", authMiddleware, changeAccountStatusController);

module.exports = router;
