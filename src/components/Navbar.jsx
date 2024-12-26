import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { user } from "../assets/images/index";

function Navbar() {
  const { userLogin, logout, userName, userImg } = useAuth();
  return (
    <>
      <div className="flex gap-5 py-2 px-4 items-center justify-between">
        <div className="flex gap-4">
          NOTO
          <NavLink to="/">Home</NavLink>
          <NavLink to="/create-note">Create Note</NavLink>
        </div>

        <div className="flex px-3 py-1 rounded-full border-2 border-gray-200 overflow-hidden max-w-md mx-auto font-[sans-serif]">
          <input
            type="email"
            placeholder="Search Something..."
            className="w-full outline-none bg-transparent text-gray-600 text-sm"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="14px"
            className="fill-gray-600"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
        </div>

        <div className="flex gap-4 items-center">
          <div
            className={`flex gap-4 items-center ${userLogin ? "hidden" : ""}`}
          >
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </div>
          <div
            className={`"flex gap-4 items-center" ${userLogin ? "" : "hidden"} `}
            onClick={logout}
          >
            Logout
          </div>

          <div className={`${userLogin ? "" : "hidden"}`}>
            <img className="w-6" src={userImg} alt="User Profile" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
