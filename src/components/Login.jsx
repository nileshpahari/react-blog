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
    // <div className="w-1/2 mx-auto p-16">
    //   <form onSubmit={handleSubmit(loginHandler)}>
    //     <div className="w-3/4 m-auto py-6">
    //       {" "}
    //       <Input
    //         type="email"
    //         label="Email"
    //         placeholder="name@domain.com"
    //         inputClasses="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //         labelClasses="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //         {...register("email", { required: true })}
    //       />
    //     </div>
    //     <div  className="w-3/4 m-auto py-6">
    //       {" "}
    //       <Input
    //         type="password"
    //         label="Password"
    //         placeholder="e.g., P@ssw0rd!"
    //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //         labelClasses="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //         {...register("password", { required: true })}
    //       />
    //     </div>

    //     <Button type="submit">Login</Button>
    //     {error && <div>{error}</div>}
    //   </form>
    //   <div>
    //     No account?&nbsp;<Link to="/signup">Crate One</Link>
    //   </div>
    // </div>
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Login</h2>

        {/* Form */}
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

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          {/* Submit Button */}
          <Button classname="w-full">Login</Button>
        </form>

        {/* Sign Up Link */}
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

{
  /*
  
<label for="input-group-1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
<div class="relative mb-6">
  <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
    </svg>
  </div>
  <input type="text" id="input-group-1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com">
</div>
<label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
<div class="flex">
  <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
    </svg>
  </span>
  <input type="text" id="website-admin" class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="elonmusk">
</div>

  */
}
