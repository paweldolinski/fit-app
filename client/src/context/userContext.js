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
      setIsNewUser(userInfo.workoutsArr.length === 0);
    }

    console.log(isNewUser, "useEffect");
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
