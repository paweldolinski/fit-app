import React, { createContext, useState } from "react";
import {
  setTokenToLocalStorage,
  setUserInfoToLocalStorage,
} from "../utils/localStorage";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState({});
  const [userObj, setUserObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onLoginChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    const options = {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    setIsLoading(true);

    try {
      const response = await fetch("/login", options);
      const json = await response.json();
      const { message } = json;
      setMessage(message);

      if (response.status === 200) {
        const { user, token } = json;

        setIsLoading(false);
        setTokenToLocalStorage(token);
        setUserInfoToLocalStorage(user);
        setUserObj(user);
        setMessage(message);
      } else {
        setMessage(message);
        setIsLoading(false);
      }
    } catch (err) {
      setMessage(`${message} - ${err}`);
      setIsLoading(false);
    }
  };

  const logOut = () => {
    localStorage.clear();
    setUserObj({});
    window.location = "/login";
  };

  return (
    <UserContext.Provider
      value={{
        userObj,
        isLoading,
        setIsLoading: setIsLoading,
        message,
        setUserObj: setUserObj,
        onLoginHandler: onLoginHandler,
        onLoginChangeHandler: onLoginChangeHandler,
        logOut: logOut,
        setMessage: setMessage,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
