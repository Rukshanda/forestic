import React, { useState } from "react";
import authService from "../appwrite/authServices.js";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/authSlice.js";
import LogoText from "./LogoText.jsx";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Logo from "./Logo.jsx";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    console.log(data);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const loggedInUser = await authService.isLogedIn();
        if (loggedInUser) {
          dispatch(login({ userData: loggedInUser }));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center text-[#16383 mt-[70px] mb-[70px]">
      <div
        className={`mx-auto w-full max-w-lg bg-[#8eb69b] rounded-xl p-10 border border-black/10 text-[#16383`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full">
            <Logo className="text-[#16383" logoDivClass="flex flex-col items-center" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-[#163832]">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-[#163832]">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              labelClass="loginInput"
              className="loginInput-bg"
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              labelClass="loginInput"
              className="loginInput-bg"
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              labelClass="loginInput"
              className="loginInput-bg"
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
