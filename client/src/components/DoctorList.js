import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      style={{
        background: "white", borderRadius: "16px", padding: "20px",
        margin: "10px", width: "280px", cursor: "pointer",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        border: "1px solid #e8f0fe", transition: "all 0.3s ease"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(26,115,232,0.2)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
      }}
    >
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a73e8, #0d47a1)",
        borderRadius: "12px", padding: "16px", marginBottom: "16px",
        textAlign: "center"
      }}>
        <div style={{
          width: "60px", height: "60px", borderRadius: "50%",
          background: "rgba(255,255,255,0.2)", display: "flex",
          alignItems: "center", justifyContent: "center",
          margin: "0 auto 10px", fontSize: "1.5rem"
        }}>
          👨‍⚕️
        </div>
        <h6 style={{ color: "white", margin: 0, fontWeight: 700, fontSize: "1rem" }}>
          Dr. {doctor.firstName} {doctor.lastName}
        </h6>
        <span style={{
          background: "rgba(255,255,255,0.2)", color: "white",
          padding: "2px 10px", borderRadius: "20px", fontSize: "0.75rem"
        }}>
          {doctor.specialization}
        </span>
      </div>

      {/* Details */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <i className="fa-solid fa-briefcase" style={{ color: "#1a73e8", width: 16 }}></i>
          <span style={{ fontSize: "0.85rem", color: "#555" }}>{doctor.experience} Years Experience</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <i className="fa-solid fa-indian-rupee-sign" style={{ color: "#1a73e8", width: 16 }}></i>
          <span style={{ fontSize: "0.85rem", color: "#555" }}>₹{doctor.feesPerConsultation} per consultation</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <i className="fa-solid fa-clock" style={{ color: "#1a73e8", width: 16 }}></i>
          <span style={{ fontSize: "0.85rem", color: "#555" }}>
            {Array.isArray(doctor.timings) 
              ? `${doctor.timings[0]} - ${doctor.timings[1]}`
              : `${Object.values(doctor.timings || {})[0] || "N/A"} - ${Object.values(doctor.timings || {})[1] || "N/A"}`
            }
          </span>
        </div>
      </div>

      <button style={{
        width: "100%", marginTop: "16px", padding: "10px",
        background: "linear-gradient(135deg, #1a73e8, #0d47a1)",
        color: "white", border: "none", borderRadius: "10px",
        fontWeight: 600, fontSize: "0.9rem", cursor: "pointer"
      }}>
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorList;