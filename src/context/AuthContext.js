import React, { createContext, useContext, useState, useEffect } from "react";

// 1st create context
const AuthContext = createContext();

const AuthProvider = (props) => {
  const [loading, SetLoading] = useState(false);
  const [user, setUser] = useState();
};

// Register With Email And Password
const signupWithEmailAndPassword=()=>{
    
}