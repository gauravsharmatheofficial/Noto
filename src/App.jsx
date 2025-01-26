import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateNote from "./pages/CreateNote";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import SingleNote from "./pages/SingleNote";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// export let authContext = useContext();
function App() {
  return (
    <>
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
        <Route path="/signup" element={<Signup />} />
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
    </>
  );
}

export default App;
