import { createContext, useState } from "react";
import axios from "../config/axios";
import { addAccessToken } from "../utils/local-storage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState({});
  //set to null/{} bcs user doesn't login yet / output should be an object.
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
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
}
