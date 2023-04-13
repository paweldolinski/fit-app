import { Link } from "react-router-dom";

const IconTile = ({ src, title, path }) => {
  return (
    <Link className="icon-tile" to={path}>
      <img src={src} />
      {title && <p>{title}</p>}
    </Link>
  );
};

export default IconTile;
