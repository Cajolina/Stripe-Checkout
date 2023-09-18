import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useCartContext } from "./CartContext";

interface ICheckoutContext {
  handleCheckout: () => void;
  checkoutErrorMessage: string;
  setCheckoutErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isPaymentVerified: boolean;
  verifyPayment: () => void;
}

const CheckoutContext = createContext<ICheckoutContext>({
  handleCheckout: () => {},
  checkoutErrorMessage: "",
  setCheckoutErrorMessage: () => {},
  isPaymentVerified: false,
  verifyPayment: () => {},
});

export const useCheckoutContext = () => useContext(CheckoutContext);

const CheckoutProvider = ({ children }: PropsWithChildren<object>) => {
  const { cart } = useCartContext();
  const [checkoutErrorMessage, setCheckoutErrorMessage] = useState("");
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);

  async function handleCheckout() {
    setCheckoutErrorMessage("");

    try {
      if (cart.length === 0) {
        setCheckoutErrorMessage("Cart is empty");
        return;
      }
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

      const { url, sessionId } = await response.json();
      localStorage.setItem("session-id", sessionId);
      window.location = url;
    } catch (error) {
      console.log(error);
    }
  }

  const verifyPayment = async () => {
    try {
      const sessionId = localStorage.getItem("session-id");
      const response = await fetch("api/verify_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ sessionId }),
      });
      const { verified } = await response.json();

      if (verified) {
        setIsPaymentVerified(true);
        localStorage.removeItem("session-id");
      } else {
        setIsPaymentVerified(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CheckoutContext.Provider
        value={{
          handleCheckout,
          checkoutErrorMessage,
          setCheckoutErrorMessage,
          isPaymentVerified,
          verifyPayment,
        }}
      >
        {children}
      </CheckoutContext.Provider>
    </div>
  );
};

export default CheckoutProvider;
