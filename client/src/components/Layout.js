import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  const doctorMenu = [
    { name: "Home", path: "/", icon: "fa-solid fa-house" },
    { name: "Appointments", path: "/doctor-appointments", icon: "fa-solid fa-calendar-check" },
    { name: "Profile", path: `/doctor/profile/${user?._id}`, icon: "fa-solid fa-user" },
  ];

  const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

  return (
    <div className="main">
      <div className="layout">

        {/* Sidebar */}
        <div className="sidebar">
          <div className="logo">
            <h6>🏥 DOC APP</h6>
            <p>Healthcare Platform</p>
          </div>
          <div className="menu">
            {SidebarMenu.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div key={index} className={`menu-item ${isActive ? "active" : ""}`}>
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className="menu-item" onClick={handleLogout} style={{ marginTop: "auto", cursor: "pointer" }}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>Logout</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="content">
          <div className="header">
            <div className="header-content">
              <Badge
                count={user?.notifcation?.length || 0}
                onClick={() => navigate("/notification")}
              >
                <i
                  className="fa-solid fa-bell"
                  style={{ fontSize: "1.3rem", cursor: "pointer", color: "#555" }}
                ></i>
              </Badge>
              <Link to="/profile">
                <i className="fa-solid fa-user" style={{ marginRight: 6 }}></i>
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>

      </div>
    </div>
  );
};

export default Layout;