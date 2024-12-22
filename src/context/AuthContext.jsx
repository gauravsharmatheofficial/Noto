import React, { createContext, useContext, useState, useEffect } from "react";

// Firebase
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebaseInit";

// 1st create context
const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [loading, SetLoading] = useState(false); 

  const [user, setUser] = useState();

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
    return signOut(firebaseAuth);
  };

  return (
    <AuthContext.Provider
      value={{
        signupWithEmailAndPassword,
        loginWithEmailAndPassword,
        resetPassword,
        loginWithGoogle,
        logout,
      }}
    >
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

// 3rd Step -> Custom Hook
export const useAuth = () => useContext(AuthContext);
