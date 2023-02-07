import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import WelcomeLogo from "../assets/svg/welcome.svg";
import Facebook from "../assets/png/facebook.png";
import Apple from "../assets/png/apple.png";
import Google from "../assets/png/google.png";
import Policy from "../components/Policy";
import IconTile from "../components/IconTile";

const WelcomePage = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    const { name } = e.target;

    name === "login" ? navigate("/login") : navigate("/register");
  };

  return (
    <div className="welcome container container__column">
      <img className="logo" alt="logo" src={WelcomeLogo} />
      <h1>Welcome to Arnie</h1>
      <p>Start your everyday workout.</p>
      <Button title="Log in" name="login" onClick={onClick} />
      <Button title="Sign up" name="signup" onClick={onClick} />
      <p className="separator">or continue with </p>
      <div className="container">
        <IconTile src={Google} path="/" />
        <IconTile src={Apple} path="/" />
        <IconTile src={Facebook} path="/" />
      </div>
      <Policy />
    </div>
  );
};

export default WelcomePage;
