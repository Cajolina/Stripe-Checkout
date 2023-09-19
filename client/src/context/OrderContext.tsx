import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem } from "./CartContext";

interface CartItemExtended extends CartItem {
  price: number;
  totalPrice: number;
}

interface IOrder {
  created: string;
  customer: {
    name: string;
    email: string;
  };
  products: CartItemExtended[];
  totalOrderAmount: number;
}

interface IOrderContext {
  getUserOrders: () => void;
  userOrderList: IOrder[];
}

const OrderContext = createContext<IOrderContext>({
  getUserOrders: async () => Promise.resolve(),
  userOrderList: [],
});

export const useOrderContext = () => useContext(OrderContext);

const OrderProvider = ({ children }: PropsWithChildren<object>) => {
  const [userOrderList, setUserOrderList] = useState([]);

  const getUserOrders = async () => {
    try {
      const response = await fetch(`/api/getOrder`);
      const data = await response.json();
      setUserOrderList(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <OrderContext.Provider value={{ getUserOrders, userOrderList }}>
        {children}
      </OrderContext.Provider>
    </div>
  );
};

export default OrderProvider;
