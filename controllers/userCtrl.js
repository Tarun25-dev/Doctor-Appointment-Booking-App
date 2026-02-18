const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");

// register controller
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({ message: "User Already Exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Registered Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Register Controller Error: ${error.message}` });
  }
};

// login controller
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: "User Not Found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({ message: "Invalid Email or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).send({ message: "Login Successful", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Login Error: ${error.message}`, success: false });
  }
};

// auth controller
const authController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.status(200).send({ message: "User Not Found", success: false });
    }
    user.password = undefined;
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Auth Error", success: false, error });
  }
};

// apply doctor controller
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = new doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    if (adminUser) {
      const notification = adminUser.notifcation;
      notification.push({
        type: "apply-doctor-request",
        message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
        data: {
          doctorId: newDoctor._id,
          name: `${newDoctor.firstName} ${newDoctor.lastName}`,
          onClickPath: "/admin/doctors",
        },
      });
      await userModel.findByIdAndUpdate(adminUser._id, { notifcation: notification });
    }
    res.status(201).send({ success: true, message: "Doctor Account Applied Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: "Error While Applying For Doctor" });
  }
};

// get all notification controller
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const seenNotification = user.seennotification;
    const notification = user.notifcation;
    seenNotification.push(...notification);
    user.notifcation = [];
    user.seennotification = seenNotification;
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All Notifications Marked As Read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error In Notifications", success: false, error });
  }
};

// delete all notifications controller
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    user.notifcation = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Unable To Delete Notifications", error });
  }
};

// get all approved doctors
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({ success: true, message: "Doctors List Fetched Successfully", data: doctors });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: "Error While Fetching Doctors" });
  }
};

// book appointment controller
const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findById(req.body.doctorInfo.userId);
    if (user) {
      user.notifcation.push({
        type: "New-Appointment-Request",
        message: `A New Appointment Request From ${req.body.userInfo.name}`,
        onClickPath: "/doctor-appointments",
      });
      await user.save();
    }
    res.status(200).send({ success: true, message: "Appointment Booked Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: "Error While Booking Appointment" });
  }
};

// booking availability controller
const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").startOf("day").toISOString();
    const fromTime = moment(req.body.time, "HH:mm").subtract(1, "hours").toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;

    const appointments = await appointmentModel.find({
      doctorId,
      date,
      status: { $nin: ["reject", "rejected"] },
      time: { $gte: fromTime, $lte: toTime },
    });

    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointment Not Available At This Time",
        success: false,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointment Available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: "Error In Booking Availability" });
  }
};

// user appointments controller
const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "User Appointments Fetched Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: "Error In User Appointments" });
  }
};

module.exports = {
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
};
