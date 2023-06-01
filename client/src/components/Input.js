import { useState } from "react";
import Eye from "../assets/svg/eye.svg";
import CrossedEye from "../assets/svg/crossed-eye.svg";

const Input = ({ placeholder, onChange, name, icon, type }) => {
  const [passwordShown, setPasswordShown] = useState(false);
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
            alt="icon"
            className="input__icon"
            src={passwordShown ? CrossedEye : Eye}
            onClick={showPassword}
          />
        )}
      </div>
    );
  }

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
};

export default Input;
