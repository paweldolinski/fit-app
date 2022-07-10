import React, { useContext, useState, createContext, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [userObj, setUserObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const onLoginChangeHandler = (e) => {
    setUserObj({
      ...userObj,
      [e.target.name]: e.target.value,
    });
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify({
        email: userObj.email,
        password: userObj.password,
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
        const { name, email, workoutsArr } = user;
        const userObjDB = { name, email, workoutsArr };

        setUserObj(userObjDB);
        setMessage("");
        setIsLoading(false);
        setIsLoggedIn(true);
        localStorage.setItem("userInfo", JSON.stringify(userObjDB));
      } else {
        console.log(json, "json from front");
      }
    } catch (err) {
      setMessage(err);
    }
  };

  const logOut = () => {
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    console.log("context", isLoggedIn)
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      setIsLoggedIn(true);
      setUserObj(userInfo);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userObj,
        isLoggedIn,
        isLoading,
        message,
        setIsLoggedIn: setIsLoggedIn,
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
