import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import authService from "../appwrite/auth.service.js";
import { useForm } from "react-hook-form";
import { login } from "../store/features/authSlice.js";
import { Input, Button } from "../components/index.js";

function SignUp() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const signUpHandler = async (data) => {
    setError(null);
    try {
      const createdUser = await authService.createUser(data);
      if (createdUser) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(login(user));
          navigate("/", { replace: true });
        } else {
          setError("Failed to sign in after creating an account");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <h2>Sign Up</h2>
      <div>
        <form onSubmit={handleSubmit(signUpHandler)}>
          <Input
            label="Full Name: "
            placeholder="John Doe"
            {...register("fullName", { required: true })}
          />
          <Input
            type="email"
            label="Email: "
            placeholder="name@example.com"
            {...register("email", { required: true })}
          />
          <Input
            type="password"
            label="Password: "
            placeholder="e.g., P@ssw0rd!"
            {...register("password", { required: true })}
          />
          <Button type="submit">Submit</Button>
        </form>
        {error && <div>{error}</div>}
        <div>
          Already have an account?&nbsp;<Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
