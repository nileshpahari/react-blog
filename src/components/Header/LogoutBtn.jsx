import React from "react";
import authService from "../../appwrite/auth.service";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn({ classname = "" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const success = await authService.logoutUser();
      if (success) {
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      alert("Logout failed");
      console.log("Failed to log out, error: ", error);
    }
  };

  return (
    <button onClick={logoutHandler} className={classname}>
      Log Out
    </button>
  );
}

export default LogoutBtn;
