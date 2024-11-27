import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { PiPencilLine } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { FaCheck } from "react-icons/fa6";
import { db } from "../config/firebaseInit";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function SingleNote() {
  const Navigate = useNavigate();
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  let getData = async () => {
    try {
      const docRef = doc(db, "notes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTitle(docSnap.data().title);
        setDesc(docSnap.data().desc);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log("set doc error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault;
    try {
      await setDoc(doc(db, "notes", id), {
        title,
        desc,
        noteCreatedTime: Timestamp.now().toDate().toString(),
      });
    } catch (error) {
      console.log("set doc error", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault;
    try {
      const deleteData = await deleteDoc(doc(db, "notes", id));
      console.log(deleteData);
    } catch (error) {
      console.log("set doc error", error);
      console.log(deleteData);
    }
    Navigate("/");
  };
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50  to-transparent p-3 gap-5 h-screen flex flex-col items-center  ">
        <div className="flex justify-between mb-5 w-2/4 ">
          <FaAngleLeft className="bg-white rounded-full p-1 size-6" />
          <div className="flex gap-2 ">
            <FaCheck
              className="bg-white rounded-full p-1 size-6"
              onClick={handleSubmit}
            />
            <RiDeleteBin5Line
              className="bg-white rounded-full p-1 size-6"
              onClick={handleDelete}
            />
          </div>
        </div>
        <form className="flex flex-col bg-white rounded-md w-2/4 drop-shadow-2xl">
          <input
            type="text"
            placeholder="title"
            className="p-3 text-2xl font-bold focus:outline-none focus:ring-0 rounded-md bg-transparent"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <p className="p-3">25-11-2024</p>
          <textarea
            placeholder="description"
            className="p-3 rounded-md bg-transparent text-gray-800 focus:outline-none focus:ring-0"
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

export default SingleNote;
