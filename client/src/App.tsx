import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Confirmation from "./components/Confirmation";
import UserProvider from "./context/UserContext";
import Cart from "./components/Cart";
import ProductProvider from "./context/ProductContext";
import CartProvider from "./context/CartContext";
import CheckoutProvider from "./context/CheckoutContext";
import UserOrders from "./components/UserOrders";
import OrderProvider from "./context/OrderContext";
function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <CheckoutProvider>
          <UserProvider>
            <OrderProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/confirmation" element={<Confirmation />} />
                  <Route path="/userorders" element={<UserOrders />} />
                </Routes>
              </BrowserRouter>
            </OrderProvider>
          </UserProvider>
        </CheckoutProvider>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
