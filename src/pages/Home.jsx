import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseInit";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let getData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notes"));

        let noteData = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          noteData.push({ id: doc.id, ...doc.data() });
        });

        setData(noteData);
      } catch (error) {
        console.log("fetch data", error);
      }
    };

    getData();
  }, []);

  

  return (
    <div className="relative h-screen">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((note, index, i) => (
          <React.Fragment key={index}>
            <NoteCard note={note} />
          </React.Fragment>
        ))}
      </div>

      <Link to="/create-note">
        <div className="absolute right-5 bottom-5">
          <FaPlus className="bg-purple-400 rounded-full  p-1 size-6 " />
        </div>
      </Link>
    </div>
  );
}

export default Home;
