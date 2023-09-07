import { useUserContext } from "../context/UserContext";
import { useState } from "react";
import RegisterUser from "./RegisterUser";
import { FaCartShopping } from "react-icons/fa6";
import { BsPersonFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
function Login() {
  const {
    fetchLoginUser,
    setPassword,
    setEmail,
    password,
    email,
    loginUser,
    isDialogOpen,

    openDialog,
    closeDialog,

    errorMessage,
  } = useUserContext();

  const [showRegister, setShowRegister] = useState(false);

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  return (
    <div>
      {loginUser == null ? (
        <div>
          <button className="signInBtn" onClick={openDialog}>
            Sign in
            <BsPersonFill />
          </button>
        </div>
      ) : (
        <div>
          <p>inloggad som: {loginUser.name}</p>
          <button>logout</button>
        </div>
      )}
      <Link to={"/cart"}>
        <span className="cartIcon">
          <FaCartShopping />
        </span>
      </Link>

      <dialog className="loginModal" open={isDialogOpen} onClose={closeDialog}>
        <div>
          <div className="exitBtnDiv">
            <button className="exitBtn" onClick={closeDialog}>
              <IoMdClose />
            </button>
          </div>

          <h2>Login</h2>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button
            onClick={() => {
              fetchLoginUser({ email, password });
              closeDialog();
            }}
          >
            Sign in
          </button>

          {showRegister && <RegisterUser />}
          {!showRegister && (
            <p className="registerHereBt" onClick={handleRegisterClick}>
              Register here
            </p>
          )}

          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </dialog>
    </div>
  );
}

export default Login;
