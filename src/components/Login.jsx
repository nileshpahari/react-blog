import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/features/authSlice";
import Input from "./index.js";
import Button from "./index.js";
import authService from "../appwrite/auth.service";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const loginHandler = async (data) => {
    setError("");
    try {
      const session = await authService.loginUser(data);
      if (session) {
        const user = await authService.getCurrentUser();
        if (user) dispatch(login(user));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={() => handleSubmit(loginHandler)}>
        <Input
        type="email"
          label="Email"
          placeholder="name@example.com"
          {...register("email", { required: true })}
        />
        <Input
          type="password"
          label="Password"
          placeholder="e.g., P@ssw0rd!"
          {...register("password", { required: true })}
        />
        <Button type="submit">Login</Button>
        {error && <div>{error}</div>}
      </form>
      <div>
        No account?&nbsp;<Link to="/signup">Crate One</Link>
      </div>
    </div>
  );
}

export default Login;
