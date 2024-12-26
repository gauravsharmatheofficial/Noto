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

// export let authContext = useContext();
function App() {
  const [islogin, setIsLogin] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar /> <Home />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar />
          <Signup />
        </>
      ),
    },
    {
      path: "/create-note",
      element: (
        <>
          {" "}
          <Navbar />
          <CreateNote />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          {" "}
          <Navbar />
          <Login />
        </>
      ),
    },
    {
      path: "/note/:id",
      element: (
        <>
          {" "}
          <Navbar />
          <SingleNote />
        </>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
