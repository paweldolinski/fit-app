export const CustomTooltip = ({ payload }) => {
  // console.log(payload, "payload");
  if (payload) {
    return (
      <div className="tooltip">
        <p>{payload[0]?.payload?.date}</p>
        <p>REPS: {payload[0]?.payload?.reps}</p>
        <p>KG: {payload[0]?.payload?.kg}</p>
      </div>
    );
  }
  return null;
};
