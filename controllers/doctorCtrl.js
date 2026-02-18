const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

// get doctor info
const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({ success: true, message: "Doctor Data Fetched Successfully", data: doctor });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: "Error In Fetching Doctor Details" });
  }
};

// update doctor profile
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,
      { new: true }
    );
    res.status(201).send({ success: true, message: "Doctor Profile Updated", data: doctor });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Doctor Profile Update Issue", error });
  }
};

// get single doctor by doctorId
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.body.doctorId);
    res.status(200).send({ success: true, message: "Single Doctor Info Fetched", data: doctor });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: "Error In Single Doctor Info" });
  }
};

// get doctor appointments
const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({ doctorId: doctor._id });
    res.status(200).send({ success: true, message: "Doctor Appointments Fetched Successfully", data: appointments });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: "Error In Doctor Appointments" });
  }
};

// update appointment status
const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointment = await appointmentModel.findByIdAndUpdate(appointmentsId, { status }, { new: true });
    const user = await userModel.findById(appointment.userId);
    if (user) {
      user.notifcation.push({
        type: "status-updated",
        message: `Your Appointment Status Has Been Updated To ${status}`,
        onClickPath: "/appointments",
      });
      await user.save();
    }
    res.status(200).send({ success: true, message: "Appointment Status Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error, message: "Error In Update Status" });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
};
