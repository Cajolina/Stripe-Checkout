import { useUserContext } from "../context/UserContext";
import RegisterUser from "./RegisterUser";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useOrderContext } from "../context/OrderContext";

function Login() {
  const {
    fetchLoginUser,
    setPassword,
    setEmail,
    password,
    email,
    openDialog,
    isDialogOpen,
    loginUser,
    closeDialog,
    logoutUser,
    errorMessage,
    handleRegisterClick,
    showRegister,
  } = useUserContext();

  const { getUserOrders } = useOrderContext();

  return (
    <div>
      {loginUser == null ? (
        <div>
          <button className="signInBtn" onClick={openDialog}>
            Sign in
          </button>
        </div>
      ) : (
        <div>
          <Link to={"/"}>
            <button onClick={logoutUser}>logout</button>
          </Link>

          <Link to={"/userorders"}>
            <button onClick={getUserOrders}>Userprofile</button>
          </Link>

          <p className="loggedinUserText">Loggedin user: {loginUser.name}</p>
        </div>
      )}

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
            className="modalSignInBtn"
            onClick={() => {
              fetchLoginUser({ email, password });
            }}
          >
            Sign in
          </button>

          {showRegister && <RegisterUser />}
          {!showRegister && (
            <p className="registerHere" onClick={handleRegisterClick}>
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
