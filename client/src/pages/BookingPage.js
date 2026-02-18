import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  const getDoctorData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      if (!date || !time) {
        return message.error("Please select both date and time");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availability",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        setIsAvailable(false);
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      if (!date || !time) {
        return message.error("Date & Time are required");
      }
      if (!isAvailable) {
        return message.error("Please check availability first");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        setIsAvailable(false);
        setDate("");
        setTime("");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorData();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h3>Book an Appointment</h3>
      <div className="container m-2">
        {doctor && (
          <div>
            <h4>Dr. {doctor.firstName} {doctor.lastName}</h4>
            <h5>Specialization: {doctor.specialization}</h5>
            <h5>Fees: ₹{doctor.feesPerConsultation}</h5>
            <h5>
              Timings:{" "}
              {Array.isArray(doctor.timings)
                ? `${doctor.timings[0]} - ${doctor.timings[1]}`
                : "N/A"}
            </h5>
            <div className="d-flex flex-column w-50 mt-3">

              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setIsAvailable(false);
                  if (value) {
                    const formatted = dayjs(value).format("DD-MM-YYYY");
                    setDate(formatted);
                    console.log("Date set:", formatted);
                  }
                }}
              />

              <TimePicker
                format="HH:mm"
                className="m-2"
                onChange={(value) => {
                  setIsAvailable(false);
                  if (value) {
                    const formatted = dayjs(value).format("HH:mm");
                    setTime(formatted);
                    console.log("Time set:", formatted);
                  }
                }}
              />

              <button
                className="btn btn-outline-primary m-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>

              {isAvailable && (
                <button
                  className="btn btn-dark m-2"
                  onClick={handleBooking}
                >
                  Book Now
                </button>
              )}

            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;