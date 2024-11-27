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

  return (
    <>
      <div className="bg-purple-300 p-5 rounded-lg flex flex-col justify-between	">
        <div className="mb-4">
          <h1 className="text-xl font-bold">{note.title}</h1>
          <p>
            {note.description > 20
              ? `${note.description.slice(0, 20)}...`
              : note.description}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-2 bg-purple-200 inline px-3 rounded-md">
            {" "}
            <FaRegClock />
            <p>{note.date}</p>
          </div>

          <div className="flex gap-2">
            {" "}
            <Link to={`/single-note/${note.id}`}>
              <PiPencilLine className="bg-white rounded-full  p-1 size-6" />
            </Link>
            <RiDeleteBin5Line
              className="bg-white rounded-full   p-1 size-6"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteCard;
