import React, { createContext, useContext, useState, useEffect } from "react";

// Firebase
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebaseInit";
import { userDefaultImg } from "../assets/images/index";
import { useNavigate } from "react-router-dom";

// 1st create context
const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [loading, SetLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState(false);
  const [activeUser, setActiveUser] = useState({});

  // Register With Email And Password
  const signupWithEmailAndPassword = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    navigate("/home");
  };

  const loginWithEmailAndPassword = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/home");
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    navigate("/home");
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setActiveUser(user);
        console.log("Active user:", user);
      } else {
        setActiveUser(null);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [loginWithGoogle]);

  return (
    <AuthContext.Provider
      value={{
        signupWithEmailAndPassword,
        loginWithEmailAndPassword,
        resetPassword,
        loginWithGoogle,
        logout,
        userLogin,
        userImg,
        userName,
      }}
    >
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

// 3rd Step -> Custom Hook
export const useAuth = () => useContext(AuthContext);
