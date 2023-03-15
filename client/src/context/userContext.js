import React, { useState, createContext, useEffect } from "react";
import { setItemToLocalstorage } from "../utiles/localStorage";

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

      console.log(json, "json");

      if (response.status === 200) {
        const { user, token } = json;

        setUserObj(user);
        setIsLoading(false);
        setItemToLocalstorage("token", token);
        setItemToLocalstorage("userInfo", JSON.stringify(user));
        setMessage(message);
      } else {
        setMessage(message);
      }
    } catch (err) {
      setMessage(`${message} - ${err}`);
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
        message,
        setUserObj: setUserObj,
        isNewUser: isNewUser,
        onLoginHandler: onLoginHandler,
        onLoginChangeHandler: onLoginChangeHandler,
        logOut: logOut,
        setIsNewUser: setIsNewUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
