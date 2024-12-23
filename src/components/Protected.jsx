import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAsyncError, useNavigate } from "react-router-dom";

function Protected({ children }, authentication) {
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector(state=>state.auth.status)
  const navigate = useNavigate()
  useEffect(() => {
    if (authentication && authentication!=authStatus){
        navigate("/login")
    } else if (!authentication && authentication!=authStatus) {
        navigate("/")
    }
    setLoading(false);
  }, [authStatus, authentication, navigate]);
  return !loading ? <>{children}</> : <h1>Loading...</h1>;
}

export default Protected;
