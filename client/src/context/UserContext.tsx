import { PropsWithChildren, useState, createContext, useContext } from "react";

export interface IUser {
  id?: string;
  name?: string;
  email: string;
  password: string;
}

export interface IUserEmailPass {
  email: string;
  password: string;
}

export interface IUserContext {
  loginUser: IUser | null;
  setLoginUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  fetchLoginUser: (user: IUserEmailPass) => Promise<string | void>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValues = {
  loginUser: null,
  setLoginUser: () => {},
  fetchLoginUser: async () => Promise.resolve(),
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
};

const UserContext = createContext<IUserContext>(defaultValues);

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [loginUser, setLoginUser] = useState<IUser | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchLoginUser = async (user: IUser) => {
    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        return console.log("gick inte att fetcha");
      }

      //checka om det sparas i statet
      setLoginUser(data);
      console.log(loginUser);
      console.log(password);
    } catch (error) {
      console.log(error);
    }
  };

  //
  return (
    <UserContext.Provider
      value={{
        loginUser,
        setLoginUser,
        fetchLoginUser,
        email,
        setEmail,
        password,
        setPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
