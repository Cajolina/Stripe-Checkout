import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Confirmation from "./components/Confirmation";
import UserProvider from "./context/UserContext";
import Cart from "./components/Cart";
import ProductProvider from "./context/ProductContext";
function App() {
  return (
    <ProductProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ProductProvider>
  );
}

export default App;
