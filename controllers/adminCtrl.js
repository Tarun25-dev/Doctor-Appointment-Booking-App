const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

// get all users
const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({ success: true, message: "Users Data List", data: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error While Fetching Users", error });
  }
};

// get all doctors
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({ success: true, message: "Doctors Data List", data: doctors });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error While Getting Doctors Data", error });
  }
};

// change doctor account status (approve/reject)
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status }, { new: true });
    const user = await userModel.findById(doctor.userId);
    if (user) {
      const notification = user.notifcation;
      notification.push({
        type: "doctor-account-request-updated",
        message: `Your Doctor Account Request Has Been ${status}`,
        onClickPath: "/notification",
      });
      user.isDoctor = status === "approved" ? true : false;
      await user.save();
    }
    res.status(201).send({ success: true, message: "Account Status Updated", data: doctor });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error In Account Status", error });
  }
};

module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
};
