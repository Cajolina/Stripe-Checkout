import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Confirmation from "./components/Confirmation";
import UserProvider from "./context/UserContext";
import Cart from "./components/Cart";
import ProductProvider from "./context/ProductContext";
import CartProvider from "./context/CartContext";
import CheckoutProvider from "./context/CheckoutContext";
function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <CheckoutProvider>
          <UserProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/confirmation" element={<Confirmation />} />
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </CheckoutProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
