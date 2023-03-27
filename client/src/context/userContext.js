import React, { createContext, useEffect, useState } from "react";
import { setItemToLocalstorage } from "../utils/localStorage";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [userObj, setUserObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isNewUser, setIsNewUser] = useState(null);

  const onLoginChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserObj({
      ...userObj,
      [name]: value,
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
      const response = await fetch("/login", options);
      const json = await response.json();
      const { message } = json;
      setMessage(message);

      if (response.status === 200) {
        const { user, token } = json;

        setUserObj(user);
        setIsLoading(false);
        setItemToLocalstorage("token", token);
        setItemToLocalstorage("userInfo", JSON.stringify(user));
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

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      setUserObj(userInfo);
      setIsNewUser(userInfo.workoutsArr.length === 0);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userObj,
        isLoading,
        setIsLoading: setIsLoading,
        message,
        setUserObj: setUserObj,
        isNewUser: isNewUser,
        onLoginHandler: onLoginHandler,
        onLoginChangeHandler: onLoginChangeHandler,
        logOut: logOut,
        setMessage: setMessage,
        setIsNewUser: setIsNewUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
