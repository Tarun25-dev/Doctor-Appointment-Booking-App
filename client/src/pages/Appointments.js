import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import moment from "moment";
import { Table } from "antd";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) setAppointments(res.data.data);
    } catch (error) { console.log(error); }
  };

  useEffect(() => { getAppointments(); }, []);

  const columns = [
    {
      title: "Doctor",
      render: (_, record) => (
        <span style={{ fontWeight: 600 }}>
          Dr. {record.doctorInfo?.firstName} {record.doctorInfo?.lastName}
        </span>
      ),
    },
    {
      title: "Date & Time",
      render: (_, record) => (
        <span>
          {moment(record.date).format("DD MMM YYYY")} &nbsp;
          <span style={{ color: "#1a73e8" }}>{moment(record.time).format("HH:mm")}</span>
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <span style={{
          padding: "4px 14px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600,
          background: text === "approved" ? "#e6f4ea" : text === "reject" ? "#fce8e6" : "#fff8e1",
          color: text === "approved" ? "#137333" : text === "reject" ? "#c5221f" : "#b06000"
        }}>
          {text}
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#1a73e8", fontWeight: 700, margin: 0 }}>My Appointments</h2>
        <p style={{ color: "#888", marginTop: "4px" }}>Track all your appointments</p>
      </div>
      <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
        <Table columns={columns} dataSource={appointments} rowKey="_id" scroll={{ x: true }} />
      </div>
    </Layout>
  );
};

export default Appointments;