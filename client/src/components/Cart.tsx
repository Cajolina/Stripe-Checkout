// import { useCartContext } from "../context/CartContext";
import { useCheckoutContext } from "../context/CheckoutContext";

import Login from "./Login";

function Cart() {
  const { handleCheckout, checkoutErrorMessage } = useCheckoutContext();
  // const { cart } = useCartContext();
  return (
    //lista allt i min cart
    <div>
      {checkoutErrorMessage && (
        <div className="error-message">
          {checkoutErrorMessage} <Login />
        </div>
      )}

      <button onClick={handleCheckout}>To checkout</button>
      {/* <div>
        {cart.map((cartItem) => (
          <div key={cartItem.product}>
            <h2>cartItem.product.name</h2>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default Cart;
