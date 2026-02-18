import React from "react";
import Layout from "./../components/Layout";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // mark all as read
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        dispatch(setUser(res.data.data));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  // delete all read notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        dispatch(setUser(res.data.data));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const tabItems = [
    {
      key: "0",
      label: "Unread",
      children: (
        <>
          <div className="d-flex justify-content-end">
            <h6
              className="p-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleMarkAllRead}
            >
              Mark All As Read
            </h6>
          </div>
          {user?.notifcation?.length === 0 ? (
            <p className="text-muted text-center">No unread notifications</p>
          ) : (
            user?.notifcation?.map((notif, index) => (
              <div
                key={index}
                className="card p-2 mb-2"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(notif.onClickPath || "/")}
              >
                <p className="card-text mb-0">{notif.message}</p>
              </div>
            ))
          )}
        </>
      ),
    },
    {
      key: "1",
      label: "Read",
      children: (
        <>
          <div className="d-flex justify-content-end">
            <h6
              className="p-2 text-danger"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllRead}
            >
              Delete All Read
            </h6>
          </div>
          {user?.seennotification?.length === 0 ? (
            <p className="text-muted text-center">No read notifications</p>
          ) : (
            user?.seennotification?.map((notif, index) => (
              <div
                key={index}
                className="card p-2 mb-2"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(notif.onClickPath || "/")}
              >
                <p className="card-text mb-0">{notif.message}</p>
              </div>
            ))
          )}
        </>
      ),
    },
  ];

  return (
    <Layout>
      <h4 className="p-3 text-center">Notifications</h4>
      <Tabs defaultActiveKey="0" items={tabItems} />
    </Layout>
  );
};

export default NotificationPage;
