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
  productsInCart: IProductsInCart[];
  totalSum: number;
}

export interface CartItem {
  product: string;
  quantity: number;
}
interface IProductsInCart extends IProduct {
  quantity: number;
}

const defaultValues = {
  cart: [],
  addToCart: () => {},
  productsInCart: [],
  totalSum: 0,
  setTotalSum: () => {},
};

const CartContext = createContext<CartContext>(defaultValues);

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren<object>) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productsInCart, setProductsInCart] = useState<IProductsInCart[]>([]);
  const [totalSum, setTotalSum] = useState(0);

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

  const findProductsByDefaultPrice = () => {
    // Extract the list of products in the cart
    const productsInCart = cart.map((item) => item.product);
    // Initialize an accumulator object to collect products and calculate total price.
    const accumulator: { products: IProductsInCart[]; totalPrice: number } = {
      products: [], // Initialize products as an empty array to store products
      totalPrice: 0, //Initialize totalPrice to keep track of the total price
    };

    //Use reduce() to create an object with products and quantity
    const result = productList.reduce(
      (acc, product) => {
        // Check if the product is in the cart
        if (productsInCart.includes(product.default_price)) {
          // Find the corresponding cart item for this product
          const cartItem = cart.find(
            (item) => item.product === product.default_price
          );

          // Determine the quantity (defaults to 0 if not found)
          const quantity = cartItem ? cartItem.quantity : 0;

          // Add the product with quantity to the accumulator's products array
          acc.products.push({
            ...product,
            quantity,
          });

          // Calculate and add the price for this product to the total price
          acc.totalPrice += (quantity * product.price) / 100;
        }
        return acc; // Return the updated accumulator for the next iteration
      },
      accumulator // Pass the initialized accumulator object as the initial value
    );

    setProductsInCart(result.products);
    setTotalSum(result.totalPrice);
    return result;
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
