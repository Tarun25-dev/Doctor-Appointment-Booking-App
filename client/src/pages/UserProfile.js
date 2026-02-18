import React from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Layout>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#1a73e8", fontWeight: 700 }}>My Profile</h2>
        <p style={{ color: "#888" }}>Your account information</p>
      </div>

      {user ? (
        <div style={{ maxWidth: "500px" }}>
          <div style={{
            background: "white", borderRadius: "16px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)", overflow: "hidden"
          }}>
            {/* Top Banner */}
            <div style={{
              background: "linear-gradient(135deg, #1a73e8, #0d47a1)",
              padding: "30px", textAlign: "center"
            }}>
              <div style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: "rgba(255,255,255,0.25)", display: "flex",
                alignItems: "center", justifyContent: "center",
                margin: "0 auto 12px", fontSize: "2rem",
                color: "white", fontWeight: 700
              }}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <h4 style={{ color: "white", margin: 0, fontWeight: 700 }}>{user.name}</h4>
              <span style={{
                background: "rgba(255,255,255,0.2)", color: "white",
                padding: "3px 14px", borderRadius: "20px",
                fontSize: "0.8rem", marginTop: "8px", display: "inline-block"
              }}>
                {user.isAdmin ? "Administrator" : user.isDoctor ? "Doctor" : "Patient"}
              </span>
            </div>

            {/* Info */}
            <div style={{ padding: "24px" }}>
              {[
                { icon: "fa-user", label: "Full Name", value: user.name },
                { icon: "fa-envelope", label: "Email", value: user.email },
                { icon: "fa-shield", label: "Account Type", value: user.isAdmin ? "Administrator" : user.isDoctor ? "Doctor" : "Patient" },
                { icon: "fa-bell", label: "Unread Notifications", value: `${user.notifcation?.length || 0} notification(s)` },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 0" }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "10px",
                      background: "#e8f0fe", display: "flex",
                      alignItems: "center", justifyContent: "center"
                    }}>
                      <i className={`fa-solid ${item.icon}`} style={{ color: "#1a73e8" }}></i>
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: "0.75rem", color: "#aaa" }}>{item.label}</p>
                      <p style={{ margin: 0, fontWeight: 600, color: "#333" }}>{item.value}</p>
                    </div>
                  </div>
                  {i < 3 && <hr style={{ margin: 0, borderColor: "#f0f0f0" }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p style={{ color: "#aaa" }}>Loading...</p>
      )}
    </Layout>
  );
};

export default UserProfile;