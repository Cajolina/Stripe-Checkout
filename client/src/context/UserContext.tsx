import {
  PropsWithChildren,
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import { useCheckoutContext } from "./CheckoutContext";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type ICredentials = Omit<IUser, "id" | "name">;

export interface IUserContext {
  loginUser: IUser | null;
  setLoginUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  fetchLoginUser: (user: ICredentials) => Promise<string | void>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  registerUserFetch: (
    name: string,
    email: string,
    password: string
  ) => Promise<string | void>;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openDialog: () => void;
  closeDialog: () => void;
  logoutUser: () => void;
  handleRegisterClick: () => void;
  showRegister: boolean;
}

const defaultValues = {
  loginUser: null,
  setLoginUser: () => {},
  fetchLoginUser: async () => Promise.resolve(),
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
  name: "",
  setName: () => {},
  registerUserFetch: async () => Promise.resolve(),
  isDialogOpen: false,
  setIsDialogOpen: () => {},
  openDialog: () => {},
  closeDialog: () => {},
  logoutUser: () => {},
  handleRegisterClick: () => {},
  showRegister: false,
};

const UserContext = createContext<IUserContext>(defaultValues);

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [loginUser, setLoginUser] = useState<IUser | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { setCheckoutErrorMessage } = useCheckoutContext();

  //modal login/register logic
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEmail("");
    setPassword("");
    setName("");
    setShowRegister(false);
    setErrorMessage("");
    setCheckoutErrorMessage("");
  };
  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  useEffect(() => {
    authorizeUser();
  }, []);

  const fetchLoginUser = async (user: ICredentials) => {
    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage("Wrong email or password");

        return console.log("gick inte att fetcha");
      }
      if (response.ok) {
        closeDialog();
      }
      setLoginUser(data);

      setCheckoutErrorMessage("");
    } catch (error) {
      setErrorMessage("Couldn´t login");
      console.log(error);
    }
  };

  const registerUserFetch = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch("/api/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (response.status === 400) {
        setErrorMessage("Gick inte att skapa");
        return console.log("gick inte att fetcha");
      }
      if (response.status === 403) {
        setErrorMessage("email already exists");
        setLoginUser(null);
        return console.log("user already exist");
      }

      if (response.ok) {
        closeDialog();
      }
      setLoginUser(data);
    } catch (error) {
      setErrorMessage("Couldn´t register");
    }
  };

  async function logoutUser() {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (response.status === 204) {
        setLoginUser(null);
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const authorizeUser = async () => {
    try {
      const response = await fetch("/api/authorize");
      if (response.status === 200) {
        const data = await response.json();

        setLoginUser(data);
      } else {
        setLoginUser(null);
      }
    } catch (error) {
      console.log(error, "gick inte att fetcha");
    }
  };

  return (
    <UserContext.Provider
      value={{
        loginUser,
        setLoginUser,
        email,
        setEmail,
        fetchLoginUser,
        password,
        setPassword,
        errorMessage,
        setErrorMessage,
        name,
        setName,
        registerUserFetch,
        isDialogOpen,
        setIsDialogOpen,
        openDialog,
        closeDialog,
        logoutUser,
        handleRegisterClick,
        showRegister,

        // getUserOrders,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
