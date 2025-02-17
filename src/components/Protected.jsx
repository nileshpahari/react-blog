import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "./index.js";

function Protected({ children, authentication }) {
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    }
    setLoading(false);
  }, [authStatus, authentication, navigate]);

  return !loading ? <>{children}</> : <Loader />;
}

export default Protected;
