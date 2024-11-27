import { useContext, useState } from "react";
import NoteCard from "./components/NoteCard";
import Start from "./components/Start";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateNote from "./pages/CreateNote";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import SingleNote from "./pages/SingleNote";
import Navbar from "./components/Navbar";

// export let authContext = useContext();
function App() {
  const [islogin, setIsLogin] = useState(true);

  return (
    <>
      {/* <authContext.provider value={demo}> */}
      {/* <SingleNote /> */}
      {/* </authContext.provider> */}
      {/* <Start /> */}
      {/* <Signup /> */}
      {/* <Login /> */}
      {/* <Note /> */}
      {/* <Home /> */}
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-note" element={<CreateNote />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/single-note/:id" element={<SingleNote />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
