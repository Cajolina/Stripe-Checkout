import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Confirmation from "./components/Confirmation";
import UserProvider from "./context/UserContext";
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
