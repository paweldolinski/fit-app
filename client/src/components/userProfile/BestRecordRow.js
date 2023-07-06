export const BestRecordRow = ({ label, bestResult, value, onClose, date }) => {
  return (
    <div className="best-row__row">
      <p className="best-row__label">{label}</p>
      <div className="best-row__box">
        <p className="best-row__date">{date}</p>
        <span className="best-row__best"> best: {bestResult} kg</span>
      </div>
      <span className="best-row__close" data-name={value} onClick={onClose}>
        &#x2715;
      </span>
    </div>
  );
};
