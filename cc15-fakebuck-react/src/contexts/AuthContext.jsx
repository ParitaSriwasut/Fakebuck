import { createContext, useEffect, useState } from "react";
import axios from "../config/axios";
import { addAccessToken, getAccessToken } from "../utils/local-storage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  //first render : state = null
  //set to null/{} bcs user doesn't login yet / output should be an object.

  //one component can have multiple useEffect()
  //useEffect() cannot use async function
  useEffect(() => {
    if (getAccessToken()) {
      axios.get("/auth/me").then((res) => {
        setAuthUser(res.data.user);
      });
    }
  }, []);
  const login = async (credential) => {
    try {
      const res = await axios.post("/auth/login", credential);
      addAccessToken(res.data.accessToken);
      setAuthUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthContext.Provider value={{ login, authUser }}>
      {children}
    </AuthContext.Provider>
  );
}
