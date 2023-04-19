import Popup from "./Popup";
import { useState } from "react";

const WorkoutTemplatesPopupRow = ({
  title,
  exercises,
  removeTemplate,
  setWorkout,
}) => {
  const [isDeleteTemplatePopupOpen, setIsDeleteTemplatePopupOpen] =
    useState(false);

  return (
    <div className="popup__row">
      <div className="popup__header-wrapper">
        <p>{title}</p>
        <div className="popup__btns-wrapper">
          <button onClick={() => setWorkout(exercises)}>Go</button>
          <button onClick={() => setIsDeleteTemplatePopupOpen(true)}>
            Delete
          </button>
        </div>
      </div>
      <ul className="popup__exercises-wrapper">
        {exercises.map((exercise, index) => {
          return <li key={index}>{exercise}</li>;
        })}
      </ul>
      {isDeleteTemplatePopupOpen && (
        <Popup
          onCancel={() => setIsDeleteTemplatePopupOpen(false)}
          onApprove={() => {
            removeTemplate(title);
            setIsDeleteTemplatePopupOpen(false);
          }}
          text={`Do you want to remove ${title} workout template`}
        />
      )}
    </div>
  );
};

export default WorkoutTemplatesPopupRow;
