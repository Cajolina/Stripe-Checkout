import { BsFillBalloonHeartFill } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useCheckoutContext } from "../context/CheckoutContext";
import { useEffect } from "react";
function Confirmation() {
  const { isPaymentVerified, verifyPayment } = useCheckoutContext();
  useEffect(() => {
    verifyPayment();
  }, []);
  return isPaymentVerified ? (
    <div className="confirmationOKContainer">
      <h2>
        Thank you for your purchase <BsFillBalloonHeartFill />
        <Link to={"/"}>
          <IoHome />
        </Link>
      </h2>
    </div>
  ) : (
    <div className="confirmationNotOkContainer">
      <h2>Något gick fel med betalningen</h2>
    </div>
  );
}

export default Confirmation;
