import React from "react";
import { useNavigate } from "react-router-dom";
import userImg from "../../assets/user.png";
import "./userTabManagement.css";
export const UsersList = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="user-detail-card">
      <img src={userImg} alt="user-logo" />
      <p>{user.first_name}</p>
      <p>{user.last_name}</p>
      <button className="details-btn" onClick={() => navigate(`./${user.id}`)}>
        Details
      </button>
    </div>
  );
};
