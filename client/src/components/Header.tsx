import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useCartContext } from "../context/CartContext";

function Header() {
  const { cart } = useCartContext();

  return (
    <div>
      <div>
        <p className="discountBanner">Discount code: FALL10</p>
      </div>
      <Link to={"/"}>
        <h1 className="headerName">KOLSVART</h1>
      </Link>

      <Login />
      <span className="cartIcon">
        {cart.length > 0 ? (
          <Link to={"/cart"}>
            <FaCartShopping />
          </Link>
        ) : (
          <FaCartShopping style={{ pointerEvents: "none" }} />
        )}
      </span>
    </div>
  );
}

export default Header;
