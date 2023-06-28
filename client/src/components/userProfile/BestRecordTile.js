export const BestRecordTile = ({ label, bestResult, value, onClose, date }) => {
  console.log(date);
  return (
    <div className="best-tiles__tile">
      <span className="best-tiles__close" data-name={value} onClick={onClose}>
        &#x2715;
      </span>
      <p className="best-tiles__date">{date}</p>
      <p className="best-tiles__label">{label}</p>
      <span className="best-tiles__best"> best: {bestResult} kg</span>
    </div>
  );
};
