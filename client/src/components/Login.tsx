// import RegisterUser from "./RegisterUser";

import { useUserContext } from "../context/UserContext";

function Login() {
  const { fetchLoginUser, setPassword, setEmail, password, email, loginUser } =
    useUserContext();

  return (
    <div>
      {loginUser == null ? (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button onClick={() => fetchLoginUser({ email, password })}>
            Logga in
          </button>
        </div>
      ) : (
        <div>
          <p>inloggad som: {loginUser.name}</p>
          <button>logout</button>
        </div>
      )}

      {/* <RegisterUser /> */}
    </div>
  );
}

export default Login;
