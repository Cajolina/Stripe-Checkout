import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IProduct, useProductContext } from "./ProductContext";

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
  productsInCart: [],
  totalSum: 0,
};

const CartContext = createContext<CartContext>(defaultValues);

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren<object>) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productsInCart, setProductsInCart] = useState([]);
  const [totalSum, setTotalSum] = useState();

  const { productList } = useProductContext();
  //Kolla om cartItems lagras i cart
  useEffect(() => {
    console.log(cart, "här är cart");
    findProductsByDefaultPrice();
  }, [cart]);

  const addToCart = (product: IProduct) => {
    console.log(product, "här är product");

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

  // const findProductsByDefaultPrice = () => {
  //   const productsInCart = cart.map((item) => item.product);

  //   const matchingProducts = productList.filter((product) =>
  //     productsInCart.includes(product.default_price)
  //   );

  //   console.log(matchingProducts);
  //   setProductsInCart(matchingProducts);
  //   return matchingProducts;
  // };
  const findProductsByDefaultPrice = () => {
    const productsInCart = cart.map((item) => item.product);

    // Använd .reduce() för att skapa ett objekt med products och quantity
    const result = productList.reduce(
      (acc, product) => {
        if (productsInCart.includes(product.default_price)) {
          const cartItem = cart.find(
            (item) => item.product === product.default_price
          );
          const quantity = cartItem ? cartItem.quantity : 0;

          // Lägg till produkten med quantity i resultatet
          acc.products.push({
            ...product,
            quantity,
          });

          // Beräkna och lägg till priset för den här produkten i totalpriset
          acc.totalPrice += (quantity * product.price) / 100;
        }
        return acc;
      },
      { products: [], totalPrice: 0 } // Initialvärde för resultatet inklusive totalpriset
    );

    console.log(result.products);
    console.log("Totalpris:", result.totalPrice); // Logga totalpriset

    setProductsInCart(result.products);
    setTotalSum(result.totalPrice);
    return result.products;
  };

  return (
    <div>
      <CartContext.Provider
        value={{ cart, addToCart, productsInCart, totalSum }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
};

export default CartProvider;
