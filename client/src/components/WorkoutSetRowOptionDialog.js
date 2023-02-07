import * as React from "react";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import Bin from "../assets/svg/bin.svg";
import Copy from "../assets/svg/copy.svg";

const WorkoutSetRowOptionDialog = ({ removeSet, copySet, setId }) => {
  return (
    <div className="workout-set-row-options-wrapper">
      <div
        className="workout-set-row-options-wrapper__item"
        onClick={() => copySet(setId)}
      >
        <img
          alt="copy set"
          className="workout-set-row-options-wrapper__icon"
          src={Copy}
        />
        <p className="workout-set-row-options-wrapper__text">duplicate</p>
      </div>
      <div
        className="workout-set-row-options-wrapper__item"
        onClick={() => removeSet(setId)}
      >
        <img
          alt="delete set"
          className="workout-set-row-options-wrapper__icon"
          src={Bin}
        />
        <p className="workout-set-row-options-wrapper__text">delete</p>
      </div>
    </div>
  );
};

export default WorkoutSetRowOptionDialog;
