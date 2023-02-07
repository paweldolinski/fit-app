const Button = ({ title, onClick, name }) => {
  return (
    <div className="btn">
      <button className="btn__btn" name={name} onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

export default Button;
