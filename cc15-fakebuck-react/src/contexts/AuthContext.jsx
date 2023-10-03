import { createContext, useEffect, useState } from "react";
import axios from "../config/axios";
import {
  addAccessToken,
  getAccessToken,
  removeAccessToken,
} from "../utils/local-storage";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [initialLoading, setinitialLoading] = useState(true);

  // console.log(authUser)

  useEffect(() => {
    if (getAccessToken()) {
      axios
        .get("/auth/me")
        .then((result) => {
          setAuthUser(result.data.user);
        })
        .finally(() => {
          setinitialLoading(false);
        });
    } else {
      //หากไม่set จะทำให้ อยู่หน้า loading ตลอด
      setinitialLoading(false);
    }
    // console.log(result.data.user)
  }, []);
  console.log(authUser);

  const login = async (credential) => {
    // try { take out because we will catch at LoginFrom
    const res = await axios.post("/auth/login", credential);
    addAccessToken(res.data.accessToken);
    setAuthUser(res.data.user);
    // } catch (err) {
    //   console.log(credential);
    // }
  };

  const register = async (registerInputObj) => {
    //send req to server to register
    // if in input state not same name as Backend data ,we have to change registerInputObj to Obj{emailOrMobile} which have key name same as database
    const res = await axios.post("/auth/register", registerInputObj);
    addAccessToken(res.data.accessToken);
    setAuthUser(res.data.user);
  };
  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ login, authUser, initialLoading, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
