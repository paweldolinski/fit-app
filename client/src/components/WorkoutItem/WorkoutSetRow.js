import * as React from "react";
import { useEffect, useState } from "react";
import Icon from "../../assets/svg/bottom-chevron.svg";
import WorkoutSetRowOptionDialog from "./WorkoutSetRowOptionDialog";

const WorkoutSetRow = ({
  index,
  onChange,
  prev,
  removeSet,
  copySet,
  kg,
  reps,
}) => {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const setNumberSet = () => {
    return index + 1;
  };

  const toggleIsOpenOption = () => {
    setIsOptionOpen(!isOptionOpen);
  };

  useEffect(() => {
    const body = document.body;
    const closeOption = (e) => {
      const {
        classList: { value },
      } = e.target;

      if (value === "option-btn open") return;

      setIsOptionOpen(false);
    };

    body.addEventListener("click", closeOption);

    return () => body.removeEventListener("click", closeOption);
  }, []);

  return (
    <>
      {prev && <p className="workout-set-row__prev">Last: {prev}</p>}
      <div className="workout-set-row__wrapper container">
        <div className="workout-set-row__set-number">{setNumberSet()}</div>
        <div className="workout-set-row__kg-wrapper">
          <input
            className="workout-set-row__kg"
            onChange={onChange}
            name="kg"
            data-id={index}
            type="number"
            value={kg}
          />
          <span>kg</span>
        </div>
        <div className="workout-set-row__separator"></div>
        <div className="workout-set-row__reps-wrapper">
          <span>x</span>
          <input
            className="workout-set-row__reps"
            onChange={onChange}
            name="reps"
            data-id={index}
            type="number"
            value={reps}
          />
        </div>
        <div className="workout-set-row__option-btn">
          <img
            className={isOptionOpen ? "option-btn open" : "option-btn"}
            src={Icon}
            onClick={toggleIsOpenOption}
          />
        </div>
        {isOptionOpen && (
          <WorkoutSetRowOptionDialog
            removeSet={removeSet}
            setId={index}
            copySet={copySet}
          />
        )}
      </div>
    </>
  );
};

export default WorkoutSetRow;
