import { useCartContext } from "../context/CartContext";
import { useCheckoutContext } from "../context/CheckoutContext";

import Login from "./Login";

function Cart() {
  const { handleCheckout, checkoutErrorMessage } = useCheckoutContext();
  const { productsInCart, totalSum } = useCartContext();

  return (
    //lista allt i min cart
    <div>
      {checkoutErrorMessage && (
        <div className="error-message">
          {checkoutErrorMessage} <Login />
        </div>
      )}

      <button onClick={handleCheckout}>To checkout</button>
      <div>
        {productsInCart.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <img className="productInCartImg" src={product.image} alt="" />
            <p>{product.price / 100} </p>
            <h3>Quantity: {product.quantity}</h3>
            <p> total: {(product.price / 100) * product.quantity} </p>
          </div>
        ))}
        <h3>Totalsum : {totalSum}</h3>
      </div>
    </div>
  );
}

export default Cart;
