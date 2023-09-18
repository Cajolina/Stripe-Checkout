import { useEffect } from "react";
import { useOrderContext } from "../context/OrderContext";
import Header from "./Header";

function UserOrders() {
  const { userOrderList, getUserOrders } = useOrderContext();
  useEffect(() => {
    getUserOrders();
  }, []);
  return (
    <div>
      <Header />
      <div className="orderContainer">
        <h2>My orders</h2>
        {userOrderList.length === 0 ? (
          <p>Du har inga lagda ordrar ännu</p>
        ) : (
          userOrderList.map((orderItem, index) => (
            <div key={index} className="orderCard">
              <p>{orderItem.created}</p>
              <ul>
                {orderItem.products.map((product, productIndex) => (
                  <li key={productIndex}>
                    Product: {product.product}
                    <br />
                    Quantity: {product.quantity}
                    <br />
                    Price: {product.price}
                    <br />
                    Total Price: {product.totalPrice}
                    <br />
                  </li>
                ))}
              </ul>
              <p>Order total: {orderItem.totalOrderAmount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserOrders;
