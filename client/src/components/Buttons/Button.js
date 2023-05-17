const Button = ({ title, onClick, name, active }) => {
  return (
    <div className={active ? "btn active" : "btn"}>
      <button className="btn__btn" name={name} onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

export default Button;
