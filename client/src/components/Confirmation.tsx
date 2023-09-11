import { BsFillBalloonHeartFill } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
function Confirmation() {
  return (
    <div>
      Thank you for your purchase <BsFillBalloonHeartFill />
      <Link to={"/"}>
        <IoHome />
      </Link>
    </div>
  );
}

export default Confirmation;
