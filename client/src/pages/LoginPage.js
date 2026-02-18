import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <div className="register-form">
        <div className="text-center mb-4">
          <div style={{
            width: "60px", height: "60px", borderRadius: "50%",
            background: "linear-gradient(135deg, #1a73e8, #0d47a1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", fontSize: "1.5rem"
          }}>
            🏥
          </div>
          <h3>Welcome Back</h3>
          <p className="subtitle">Login to your account</p>
        </div>

        <Form layout="vertical" onFinish={onFinishHandler}>
          <Form.Item
            label={<span style={{ fontWeight: 600 }}>Email Address</span>}
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              size="large"
              style={{ borderRadius: "10px" }}
              prefix={<i className="fa-solid fa-envelope" style={{ color: "#1a73e8", marginRight: 8 }} />}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: 600 }}>Password</span>}
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              size="large"
              style={{ borderRadius: "10px" }}
              prefix={<i className="fa-solid fa-lock" style={{ color: "#1a73e8", marginRight: 8 }} />}
            />
          </Form.Item>

          <button
            type="submit"
            className="btn w-100 mt-2"
            style={{
              background: "linear-gradient(135deg, #1a73e8, #0d47a1)",
              color: "white", border: "none", padding: "12px",
              borderRadius: "10px", fontSize: "1rem", fontWeight: 600,
              cursor: "pointer", transition: "opacity 0.2s"
            }}
          >
            Login
          </button>

          <p className="text-center mt-3" style={{ color: "#888" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#1a73e8", fontWeight: 600 }}>
              Register here
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;