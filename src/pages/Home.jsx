import React from "react";
import NoteCard from "../components/NoteCard";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useNote } from "../context/NotesContext";

function Home() {
  const { data } = useNote();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50  to-transparent p-3">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((note, index) => (
          <React.Fragment key={index}>
            <NoteCard note={note} />
          </React.Fragment>
        ))}
      </div>

      <Link to="/create-note">
        <div className="fixed right-10 bottom-10">
          <FaPlus className="bg-orange-400 hover:bg-orange-500 text-white hover:scale-110 hover:transition hover:duration-100 hover:ease-in-out rounded-full p-2 size-9" />
        </div>
      </Link>
    </div>
  );
}

export default Home;
