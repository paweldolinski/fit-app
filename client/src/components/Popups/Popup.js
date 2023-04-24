import Input from "../Input";

const Popup = ({ text, onApprove, onCancel, input, onChange }) => {
  return (
    <div className="popup">
      <p>{text}</p>
      {input && <Input onChange={onChange} placeholder="Name..." />}
      <div className="popup__btns-wrapper">
        {onApprove && <button onClick={onApprove}>Ok</button>}
        {onCancel && <button onClick={onCancel}>Cancel</button>}
      </div>
    </div>
  );
};

export default Popup;
