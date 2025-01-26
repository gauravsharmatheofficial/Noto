import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiPencilLine } from "react-icons/pi";
import { FaRegClock } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseInit";

function NoteCard({ note }) {
  const handleDelete = async (e) => {
    try {
      await deleteDoc(doc(db, "notes", note.id));
    } catch (error) {
      console.log("delete doc error", error);
    }
  };

  let date = new Date(note.noteCreatedTime.toString());
  let options = { day: "2-digit", month: "short", year: "numeric" };
  let formattedDate = date.toLocaleDateString("en-US", options);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let meridian = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let finalTime = `${formattedDate} ${hours}:${minutes} ${meridian}`;

  return (
    <>
      <div className="bg-orange-200 p-6 min-h-40 rounded-3xl flex flex-col justify-between">
        <div className="">
          <h1 className="text-xl font-bold text-gray-950 ">{note.title}</h1>
          <p className="text-gray-800 ">
            {note.desc > 20 ? note.desc.slice(0, 20) : note.desc}
          </p>
        </div>
        <div className="flex justify-between items-center mt-5">
          <div className="flex justify-between text-sm items-center gap-2 bg-white px-3 h-9 rounded-full">
            <FaRegClock />
            <p>{finalTime}</p>
          </div>

          <div className="flex gap-3 ">
            <Link to={`/single-note/${note.id}`}>
              <PiPencilLine className="bg-white  hover:bg-orange-400 hover:text-white hover:scale-110 hover:transition hover:duration-100 hover:ease-in-out rounded-full p-2 size-9"/>
            </Link>
            <RiDeleteBin5Line
              className="bg-white rounded-full p-2 size-9  hover:cursor-pointer hover:bg-orange-400 hover:text-white hover:scale-110 hover:transition hover:duration-100 hover:ease-in-out"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteCard;
