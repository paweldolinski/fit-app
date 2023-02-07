import { useContext, useEffect, useState } from "react";
import Eye from "../assets/svg/eye.svg";
import CrossedEye from "../assets/svg/crossed-eye.svg";
import { WorkoutContext } from "../context/workoutContext";

const Input = ({ placeholder, onChange, name, icon }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { checkIfEmptySets } = useContext(WorkoutContext);

  const showPassword = () => {
    setPasswordShown(!passwordShown);
  };

  if (icon) {
    return (
      <div className="input">
        <input
          type={passwordShown ? "text" : "password"}
          className="input__input"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
        />
        {icon && (
          <img
            className="input__icon"
            src={passwordShown ? CrossedEye : Eye}
            onClick={showPassword}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="input">
        <input
          type="text"
          className="input__input"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
        />
      </div>
    );
  }
};

export default Input;
