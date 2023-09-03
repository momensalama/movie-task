import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="logo">
      <h1>
        Movies<span>DB</span>
      </h1>
    </Link>
  );
}

export default Logo;
