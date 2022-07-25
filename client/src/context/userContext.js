import React, { useState, createContext, useEffect } from "react";
import { setItemToLocalstorage } from "../Utiles/localStorage";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [userObj, setUserObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onLoginChangeHandler = (e) => {
    setUserObj({
      ...userObj,
      [e.target.name]: e.target.value,
    });
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();
    const { email, password } = userObj;
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
      const response = await fetch("http://localhost:5000/login", options);
      const json = await response.json();

      if (response.status === 200) {
        const { user, token } = json;

        setUserObj(user);
        setIsLoading(false);
        setItemToLocalstorage("token", token);
        setItemToLocalstorage("userInfo", JSON.stringify(user));
      }
    } catch (err) {
      setMessage(err);
    }
  };

  const logOut = () => {
    localStorage.clear();
    setUserObj({});
    window.location = "/login";
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      setUserObj(userInfo);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userObj,
        isLoading,
        message,
        setUserObj: setUserObj,
        onLoginHandler: onLoginHandler,
        onLoginChangeHandler: onLoginChangeHandler,
        logOut: logOut,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
