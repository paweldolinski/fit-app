import { Link } from "react-router-dom";
import Chevron from "../assets/svg/left-chevron-svgrepo-com.svg";

const Back = () => {
  return (
    <Link className="back" to="/">
      <img src={Chevron} />
      Back
    </Link>
  );
};

export default Back;
