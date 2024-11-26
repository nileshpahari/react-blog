import React from "react";
import authService from "../../appwrite/auth.service";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  
  const logoutHandler = () => {
    authService
      .logoutUser()
      .then(dispatch(logout()))
      .catch((error) => console.log("Failed to log out, error: ", error));
  };

  return (<button onClick={logoutHandler}>Log Out</button>);
}

export default LogoutBtn;
