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

// 1st create context
const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [loading, SetLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");

  const [userLogin, setUserLogin] = useState(false);

  // Register With Email And Password
  const signupWithEmailAndPassword = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmailAndPassword = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = async (email) => {
    sendPasswordResetEmail(auth, email);
  };

  const loginWithGoogle = async () => {
    console.log("signin with google... ");
    signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("signout");
        console.log(userLogin);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const userIsLogedin = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserLogin(true);
      setUserName(user.displayName);
      setUserImg(user.photoURL || userDefaultImg);
    } else {
      setUserLogin(false);
      setUserName("");
      setUserImg("");
    }
  });

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
