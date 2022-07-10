import {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const [userObj] = useState(JSON.parse(localStorage.getItem("userInfo")))

    const navigate = useNavigate();

    console.log(userObj)

    useEffect(() => {
        if (!userObj) {
            navigate("/login");
        }
    },[userObj]);

    return (
      <div className="register">
        <h1>UserProfile</h1>
        <h2>Welcome: {userObj && userObj.name}</h2>
      </div>
    );
};

export default UserProfile;
