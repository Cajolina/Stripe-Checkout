import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useCheckoutContext } from "../context/CheckoutContext";
import { useUserContext } from "../context/UserContext";

import Login from "./Login";

function Cart() {
  const { handleCheckout, checkoutErrorMessage } = useCheckoutContext();
  const { productsInCart, totalSum } = useCartContext();
  const { loginUser } = useUserContext();

  return (
    <div className="cartContainer">
      <h2>Cart</h2>

      {checkoutErrorMessage && (
        <div className="error-message">
          {checkoutErrorMessage === "Cart is empty" ? (
            <Link to={"/"}>
              <button className="continue-shopping-btn">
                Continue Shopping
              </button>
            </Link>
          ) : (
            <>
              <p>{checkoutErrorMessage}</p>
              {loginUser ? null : <Login />}
            </>
          )}
        </div>
      )}
      <div className="inCartContainer">
        {productsInCart.map((product) => (
          <div className="cartCard" key={product.id}>
            <div>
              <img className="productInCartImg" src={product.image} alt="" />
            </div>
            <div className="textCartCard">
              <h3>{product.name}</h3>
              <p>{product.price / 100} each</p>
              <h3>Quantity: {product.quantity}</h3>
              <p> Price total: {(product.price / 100) * product.quantity} </p>
            </div>
          </div>
        ))}
        <h3>Totalsum : {totalSum}</h3>
      </div>
      <button className="checkoutBtn" onClick={handleCheckout}>
        To checkout
      </button>
    </div>
  );
}

export default Cart;
