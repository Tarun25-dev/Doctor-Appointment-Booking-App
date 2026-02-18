import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import DoctorList from "../components/DoctorList";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  const getAllDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      if (res.data.success) setDoctors(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { getAllDoctors(); }, []);

  return (
    <Layout>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#1a73e8", fontWeight: 700, margin: 0 }}>
          Available Doctors
        </h2>
        <p style={{ color: "#888", marginTop: "4px" }}>
          Book an appointment with our verified doctors
        </p>
      </div>

      {doctors.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "60px",
          background: "white", borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>👨‍⚕️</div>
          <h5 style={{ color: "#555" }}>No doctors available yet</h5>
          <p style={{ color: "#aaa" }}>Check back later</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {doctors.map((doctor) => (
            <DoctorList key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default HomePage;