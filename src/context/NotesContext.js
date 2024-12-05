import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseInit";
const NoteContext = createContext();

const NoteProvider = (props) => {
  const showAllNotes = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      let getData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "notes"));

          let noteData = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data());
            noteData.push({ id: doc.id, ...doc.data() });
          });

          setData(noteData);
        } catch (error) {
          console.log("fetch data", error);
        }
      };

      getData();
    }, []);
  };
};

const useNote = () => useContext(NoteContext);

export { NoteProvider, useNote };
