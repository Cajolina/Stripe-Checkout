import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Login from "./Login";
import { useCartContext } from "../context/CartContext";

function Header() {
  const { cart } = useCartContext();
  const scrollToTopOfPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="header-container">
      <div>
        <p className="discountBanner">Discount code: FALL10</p>
      </div>
      <div className="headerandlogin">
        <Link to={"/"}>
          <h1 className="headerName" onClick={scrollToTopOfPage}>
            KOLSVART
          </h1>
        </Link>
        <div>
          <div className="loginandcart">
            <Login />
            <div className="cartIcon centered-cart">
              {cart.length > 0 ? (
                <Link to={"/cart"}>
                  <FaCartShopping />
                </Link>
              ) : (
                <FaCartShopping style={{ pointerEvents: "none" }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
