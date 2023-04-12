import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Back from "../components/Back";
import Button from "../components/Button";
import { Loader } from "../components/Loader";

const Login = () => {
  const { onLoginChangeHandler, onLoginHandler, message, isLoading } =
    useContext(UserContext);
  const location = useLocation();
  const redirectionPath = location.state?.path || "/user-profile";
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("token");

    if (isUserLoggedIn) {
      navigate(redirectionPath);
    }
  });

  return (
    <div className="login">
      <Back />
      <h1 className="left">Log In</h1>
      <Input
        placeholder="Username or email"
        name="email"
        onChange={onLoginChangeHandler}
      />
      <Input
        placeholder="Password"
        name="password"
        onChange={onLoginChangeHandler}
        icon={true}
      />
      <Button title="Log in" onClick={onLoginHandler} />
      <Link className="forgot-password" to="#">
        Forgot Password ?
      </Link>
      <p>{message}</p>
      {isLoading && <Loader />}
    </div>
  );
};

export default Login;
