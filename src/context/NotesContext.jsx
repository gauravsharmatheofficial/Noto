import React, { createContext, useContext, useState, useEffect } from "react";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebaseInit";
import { FaAngleLeft, FaCheck } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useAuth } from "./AuthContext";

const NoteContext = createContext();
const NoteProvider = (props) => {
  const [loading, SetLoading] = useState(false);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { activeUser } = useAuth();
  const [notes, setNotes] = useState();

  useEffect(() => {
    let getData = async () => {
      try {
        const newNoteRef = collection(db, `users/${activeUser.uid}/notes`);
        console.log("newNoteRef", newNoteRef);

        // Realtime Database
        const q = query(
          newNoteRef,
          orderBy("createdAt", "desc") // Sort by addedDate in descending order
        );
        onSnapshot(q, (querySnapshot) => {
          const notesData = [];

          querySnapshot.forEach((doc) => {
            notesData.push({ id: doc.id, ...doc.data() });
          });
          setNotes(notesData);
        });
        console.log(notes);
        // const querySnapshot = await getDocs(collection(db, "notes"));
        // let noteData = [];
        // querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.data());
        //   noteData.push({ id: doc.id, ...doc.data() });
        // });
        // setData(noteData);
        
      } catch (error) {
        console.log("fetch data", error);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault;
    try {
      await addDoc(collection(db, "notes"), {
        title,
        desc,
        noteCreatedTime: Timestamp.now().toDate().toString(),
      });
    } catch (error) {
      console.log("set doc error", error);
    }
    handleSubmit();
    setTitle("");
    setDesc("");
  };

  return (
    <NoteContext.Provider
      value={{
        data,
        title,
        desc,
        setTitle,
        setDesc,
        handleSubmit,
      }}
    >
      {!loading && props.children}
    </NoteContext.Provider>
  );
};

const useNote = () => useContext(NoteContext);
export { NoteProvider, useNote };
