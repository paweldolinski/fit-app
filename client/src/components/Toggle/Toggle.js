export const Toggle = ({ rightLabel, leftLabel, toggle, onToggle }) => {
  return (
    <div className={toggle ? "toggle active" : "toggle"}>
      <div className="toggle__label left" onClick={() => onToggle(false)}>
        {leftLabel}
      </div>

      <div className="toggle__box" onClick={() => onToggle(!toggle)}>
        <div className="toggle__btn"></div>
      </div>
      <div className="toggle__label right" onClick={() => onToggle(true)}>
        {rightLabel}
      </div>
    </div>
  );
};
