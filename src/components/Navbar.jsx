import React from "react";
import { FaAngleLeft } from "react-icons/fa6";

function Navbar() {
  return (
    <nav className="p-3">
      <div className="flex justify-between items-center bg-slate-100 h-14 rounded-full p-3 drop-shadow-xl">
        <FaAngleLeft className="bg-white rounded-full p-2 size-9" />
        <input
          type="text"
          className="bg-transparent focus:outline-none focus:ring-0"
          placeholder="search your notes"
        />
        <FaAngleLeft className="bg-white rounded-full p-2 size-9" />
      </div>
    </nav>
  );
}

export default Navbar;
