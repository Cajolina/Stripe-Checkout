import { useUserContext } from "../context/UserContext";

function RegisterUser() {
  const {
    setPassword,
    setEmail,
    setName,
    password,
    email,
    name,

    registerUserFetch,
  } = useUserContext();

  return (
    <div className="registerUserContainer">
      <h2>Register User</h2>
      <div>
        <p>name:</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <p>email:</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p>password:</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="modalRegisterBtn"
          onClick={() => {
            registerUserFetch(name, email, password);
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default RegisterUser;
