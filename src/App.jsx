import { useContext, useState } from "react";
import NoteCard from "./components/NoteCard";
import Start from "./components/Start";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateNote from "./pages/CreateNote";
import {
  Route,
  BrowserRouter,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SingleNote from "./pages/SingleNote";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// export let authContext = useContext();
function App() {
  const { userLogin } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute>
                <Signup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-note"
            element={
              <ProtectedRoute>
                <CreateNote />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/note/:id"
            element={
              <ProtectedRoute>
                <SingleNote />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
