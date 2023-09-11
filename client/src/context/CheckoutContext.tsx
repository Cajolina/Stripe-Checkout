import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useCartContext } from "./CartContext";

interface ICheckoutContext {
  handleCheckout: () => void;
  checkoutErrorMessage: string;
  setCheckoutErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const CheckoutContext = createContext<ICheckoutContext>({
  handleCheckout: () => {},
  checkoutErrorMessage: "",
  setCheckoutErrorMessage: () => {},
});

export const useCheckoutContext = () => useContext(CheckoutContext);

const CheckoutProvider = ({ children }: PropsWithChildren<object>) => {
  const { cart } = useCartContext();
  const [checkoutErrorMessage, setCheckoutErrorMessage] = useState("");

  async function handleCheckout() {
    console.log(cart);
    setCheckoutErrorMessage("");
    try {
      const response = await fetch("api/create_checkout_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        setCheckoutErrorMessage("You must be logged in to proceed to checkout");

        return;
      }
      const { url } = await response.json();
      window.location = url;
    } catch (error) {
      setCheckoutErrorMessage("You must be logged in to proceed to checkout");
      console.log(error);
    }
  }
  return (
    <div>
      <CheckoutContext.Provider
        value={{
          handleCheckout,
          checkoutErrorMessage,
          setCheckoutErrorMessage,
        }}
      >
        {children}
      </CheckoutContext.Provider>
    </div>
  );
};

export default CheckoutProvider;
