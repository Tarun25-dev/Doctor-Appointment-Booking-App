import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.data.success) setUsers(res.data.data);
    } catch (error) { console.log(error); }
  };

  useEffect(() => { getUsers(); }, []);

  const columns = [
    {
      title: "User",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "50%",
            background: "linear-gradient(135deg, #1a73e8, #0d47a1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: 700
          }}>
            {record.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>{record.name}</p>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#888" }}>{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Role",
      render: (_, record) => (
        <span style={{
          padding: "4px 14px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600,
          background: record.isAdmin ? "#fce8e6" : record.isDoctor ? "#e6f4ea" : "#e8f0fe",
          color: record.isAdmin ? "#c5221f" : record.isDoctor ? "#137333" : "#1a73e8"
        }}>
          {record.isAdmin ? "Admin" : record.isDoctor ? "Doctor" : "Patient"}
        </span>
      ),
    },
    {
      title: "Actions",
      render: () => (
        <button style={{
          padding: "6px 16px", background: "#fce8e6", color: "#c5221f",
          border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer"
        }}>
          Block
        </button>
      ),
    },
  ];

  return (
    <Layout>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#1a73e8", fontWeight: 700, margin: 0 }}>All Users</h2>
        <p style={{ color: "#888", marginTop: "4px" }}>Manage platform users</p>
      </div>
      <div style={{ background: "white", borderRadius: "16px", padding: "20px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
        <Table columns={columns} dataSource={users} rowKey="_id" scroll={{ x: true }} />
      </div>
    </Layout>
  );
};

export default Users;