import React, { useState } from "react";
import { googleLogo } from "../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loginWithEmailAndPassword, loginWithGoogle } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const loginUser = await loginWithEmailAndPassword(email, password);
      console.log(loginUser);
    } catch (error) {
      console.log("signin error", error);
    }
  }

  // const provider = new GoogleAuthProvider();
  async function handleGoogle() {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.log("login with google", error);
    }
    navigate("/");
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-50 via-orange-50  to-transparent p-3">
        <div className="p-6 w-full sm:max-w-[400px] text-center bg-white sm:p-10 rounded-[30px] drop-shadow-2xl">
          <h1 className="text-2xl font-semibold">Login an account</h1>
          <Link
            to="/signup"
            className="pt-2 text-gray-800 hover:text-orange-500 "
          >
            Don't have an account?
          </Link>
          <form className="pt-5 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
              <input
                className=" w-full border-2 rounded-lg p-2 border-slate-200 focus:border-slate-500 focus:outline-none focus:ring-0"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="relative">
              <input
                className=" w-full border-2 rounded-lg p-2 border-slate-200 focus:border-slate-500 focus:outline-none focus:ring-0"
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                color="rgb(229 211 255)"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute right-3 bottom-3 stroke-2"
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                <line
                  className={showPassword ? "hidden" : ""}
                  x1="2"
                  x2="22"
                  y1="2"
                  y2="22"
                ></line>
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <div className="flex justify-end ">
              <p className="text-sm text-gray-600">Recovery password</p>
            </div>
            <div>
              {" "}
              <button className=" text-lg  bg-orange-300 hover:bg-orange-400  w-full  rounded-lg p-2">
                Continue
              </button>
            </div>
          </form>
          <p className="text-center py-5  text-gray-800">---- or ----</p>
          <div
            className="flex justify-center mx-auto border-slate-200 hover:bg-slate-50 text-gray-800 items-center gap-3 w-full border-2 p-2 rounded-lg "
            onClick={handleGoogle}
          >
            <img className="w-6 " src={googleLogo} alt="Google Logo" />
            Signin With Google
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
