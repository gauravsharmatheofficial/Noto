import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { PiPencilLine } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { FaCheck } from "react-icons/fa6";
import { db } from "../config/firebaseInit";
import { useNote } from "../context/NotesContext";

function createNote() {
  const { handleSubmit, title, desc, setTitle, setDesc } = useNote();

  return (
    <>
      <div className="bg-gray-100 p-5 gap-5 h-screen flex flex-col items-center  ">
        <div className="flex justify-between mb-5 w-2/4">
          <FaAngleLeft className="bg-white rounded-full p-1 size-6" />
          <div className="flex gap-2 ">
            <FaCheck
              className="bg-white rounded-full p-1 size-6"
              onClick={handleSubmit}
            />
            <RiDeleteBin5Line className="bg-white rounded-full p-1 size-6" />
          </div>
        </div>
        <form className="flex flex-col bg-white rounded-md w-2/4">
          <input
            type="text"
            placeholder="title"
            className="p-3 rounded-md bg-transparent"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <p className="p-3">25-11-2024</p>
          <textarea
            placeholder="description"
            className="p-3 rounded-md bg-transparent"
            rows={12}
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </form>
      </div>
    </>
  );
}

export default createNote;
