import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const UserProfile = () => {
  const { isLoggedIn, userObj } = useContext(UserContext);

  if (isLoggedIn) {
    return (
      <div className="register">
        <h1>UserProfile</h1>
        <h2>Welcome: {userObj.name}</h2>
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default UserProfile;
