import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IProduct } from "./ProductContext";

interface CartContext {
  cart: CartItem[];
  addToCart: (product: IProduct) => void;
}

export interface CartItem {
  product: string;
  quantity: number;
}

const defaultValues = {
  cart: [],
  addToCart: () => {},
};

const CartContext = createContext<CartContext>(defaultValues);

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren<object>) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  //Kolla om cartItems lagras i cart
  useEffect(() => {
    console.log(cart, "hejehj");
  }, [cart]);

  const addToCart = (product: IProduct) => {
    console.log(product);

    const existingItemInCart = cart.find(
      (item: CartItem) => item.product === product.default_price
    );
    if (existingItemInCart) {
      existingItemInCart.quantity++;
      setCart([...cart]);
    } else {
      setCart([...cart, { product: product.default_price, quantity: 1 }]);
    }
  };

  return (
    <div>
      <CartContext.Provider value={{ cart, addToCart }}>
        {children}
      </CartContext.Provider>
    </div>
  );
};

export default CartProvider;
