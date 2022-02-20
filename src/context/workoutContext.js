import React, { useContext, useState, createContext } from "react";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [userObj, setUserObj] = useState({
    name: "Pawel",
    email: "ocebeki@gmail.com",
    password: "123123",
    data: {
      workouts: [
        {
          dataStamp: "11.12.2002",
          title: "Upperbody workout",
          id: 1,
          workout: [],
        },
      ],
    },
  });

  const createWorkout = (obj) => {
    // setUserObj({ ...userObj.data.workouts, obj });
    console.log(obj);
  };

  return (
    <UserContext.Provider
      value={{
        userObj,
        createWorkout: createWorkout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
