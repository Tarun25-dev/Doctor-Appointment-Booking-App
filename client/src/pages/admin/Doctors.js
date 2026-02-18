import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { message, Table } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) setDoctors(res.data.data);
    } catch (error) { console.log(error); }
  };

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post("/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (res.data.success) { message.success(res.data.message); getDoctors(); }
    } catch (error) { message.error("Something Went Wrong"); }
  };

  useEffect(() => { getDoctors(); }, []);

  const columns = [
    {
      title: "Doctor",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "50%",
            background: "linear-gradient(135deg, #1a73e8, #0d47a1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: 700
          }}>
            {record.firstName?.charAt(0)}
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>Dr. {record.firstName} {record.lastName}</p>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#888" }}>{record.email}</p>
          </div>
        </div>
      ),
    },
    { title: "Specialization", dataIndex: "specialization" },
    { title: "Phone", dataIndex: "phone" },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span style={{
          padding: "4px 14px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600,
          background: text === "approved" ? "#e6f4ea" : text === "rejected" ? "#fce8e6" : "#fff8e1",
          color: text === "approved" ? "#137333" : text === "rejected" ? "#c5221f" : "#b06000"
        }}>
          {text}
        </span>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          {record.status === "pending" ? (
            <button onClick={() => handleAccountStatus(record, "approved")} style={{
              padding: "6px 16px", background: "#e6f4ea", color: "#137333",
              border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer"
            }}>
              Approve
            </button>
          ) : (
            <button onClick={() => handleAccountStatus(record, "rejected")} style={{
              padding: "6px 16px", background: "#fce8e6", color: "#c5221f",
              border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer"
            }}>
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#1a73e8", fontWeight: 700, margin: 0 }}>All Doctors</h2>
        <p style={{ color: "#888", marginTop: "4px" }}>Manage doctor applications</p>
      </div>
      <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
        <Table columns={columns} dataSource={doctors} rowKey="_id" scroll={{ x: true }} />
      </div>
    </Layout>
  );
};

export default Doctors;