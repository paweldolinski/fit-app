import * as React from "react";
import Icon from "../assets/svg/dumbbell.svg";

export const Loader = () => {
  return (
    <div className="loader-wrapper">
      <img src={Icon} />
    </div>
  );
};
