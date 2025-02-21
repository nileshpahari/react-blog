import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/features/authSlice.js";
import { Input, Button } from "./index.js";
import authService from "../appwrite/auth.service.js";
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
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(loginHandler)} className="space-y-5">
          <Input
            type="email"
            label="Email"
            placeholder="name@domain.com"
            inputClasses="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            labelClasses="block mb-2 text-sm font-medium text-gray-300"
            {...register("email", { required: true })}
          />
          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            inputClasses="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            labelClasses="block mb-2 text-sm font-medium text-gray-300"
            {...register("password", { required: true })}
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button classname="w-full">Login</Button>
        </form>

        <div className="mt-4 text-gray-400 text-sm text-center">
          No account?&nbsp;
          <Link to="/signup" className="text-blue-500 hover:underline">
            Create One
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
