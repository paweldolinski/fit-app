const Popup = ({ text, onApprove, onCancel }) => {
  return (
    <div className="popup">
      <p>{text}</p>
      <div className="popup__btns-wrapper">
        {onApprove && <button onClick={onApprove}>Ok</button>}
        {onCancel && <button onClick={onCancel}>Cancel</button>}
      </div>
    </div>
  );
};

export default Popup;
