const WorkoutHistorySetRow = ({ kg, reps, date, max, min }) => {
  const getColor = (value, min, max) => {
    if (value > max) value = max;
    const v = (value - min) / (max - min);
    const hue = ((1 - v) * 120).toString(10);

    return `hsl( ${hue},100%,50%)`;
  };

  return (
    <div
      className="workout-history__result-row"
      style={{ backgroundColor: getColor(kg, min, max) }}
    >
      <span>{date}</span>
      <span>{kg}</span>
      <span>{reps}</span>
    </div>
  );
};

export default WorkoutHistorySetRow;
