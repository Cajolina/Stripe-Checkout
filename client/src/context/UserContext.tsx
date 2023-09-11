import { PropsWithChildren, useState, createContext, useContext } from "react";
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
  };

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

      console.log(data.email);

      if (!response.ok) {
        setErrorMessage("Wrong email or password");
        // setShowRegister(true);
        return console.log("gick inte att fetcha");
      }

      //checka om det sparas i statet
      setLoginUser(data);
      setCheckoutErrorMessage("");
      console.log(loginUser);
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
      console.log(data);
      setLoginUser(data);
      if (!response.ok) {
        setErrorMessage("Gick inte att skapa");
        return console.log("gick inte att fetcha");
      }
    } catch (error) {
      setErrorMessage("Couldn´t register");
    }
  };

  //
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

// import { PropsWithChildren, useState, createContext, useContext } from "react";

// export interface IUser {
//   id?: string;
//   name?: string;
//   email: string;
//   password: string;
// }

// export interface IUserEmailPass {
//   email: string;
//   password: string;
// }

// export interface IRegisterUser {
//   id?: string;
//   registerName: string;
//   registerEmail: string;
//   registerPassword: string;
// }

// export interface IUserContext {
//   loginUser: IUser | null;
//   setLoginUser: React.Dispatch<React.SetStateAction<IUser | null>>;
//   fetchLoginUser: (user: IUserEmailPass) => Promise<string | void>;
//   email: string;
//   setEmail: React.Dispatch<React.SetStateAction<string>>;
//   password: string;
//   setPassword: React.Dispatch<React.SetStateAction<string>>;
//   errorMessage: string;
//   setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
//   registerName: string;
//   setRegisterName: React.Dispatch<React.SetStateAction<string>>;
//   registerEmail: string;
//   setRegisterEmail: React.Dispatch<React.SetStateAction<string>>;
//   registerPassword: string;
//   setRegisterPassword: React.Dispatch<React.SetStateAction<string>>;
//   registerUserFetch: (user: IRegisterUser) => Promise<string | void>;
// }

// const defaultValues = {
//   loginUser: null,
//   setLoginUser: () => {},
//   fetchLoginUser: async () => Promise.resolve(),
//   email: "",
//   setEmail: () => {},
//   password: "",
//   setPassword: () => {},
//   errorMessage: "",
//   setErrorMessage: () => {},
//   registerName: "",
//   setRegisterName: () => {},
//   registerUserFetch: async () => Promise.resolve(),
//   registerEmail: "",
//   setRegisterEmail: () => {},
//   registerPassword: "",
//   setRegisterPassword: () => {},
// };

// const UserContext = createContext<IUserContext>(defaultValues);

// export const useUserContext = () => useContext(UserContext);

// const UserProvider = ({ children }: PropsWithChildren) => {
//   const [loginUser, setLoginUser] = useState<IUser | null>(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [registerName, setRegisterName] = useState("");
//   const [registerEmail, setRegisterEmail] = useState("");
//   const [registerPassword, setRegisterPassword] = useState("");

//   const [errorMessage, setErrorMessage] = useState("");

//   const fetchLoginUser = async (user: IUser) => {
//     try {
//       const response = await fetch(`/api/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });
//       const data = await response.json();

//       console.log(data);

//       if (!response.ok) {
//         setErrorMessage("Wrong email or password");
//         return console.log("gick inte att fetcha");
//       }

//       //checka om det sparas i statet
//       setLoginUser(data);
//     } catch (error) {
//       setErrorMessage("Couldn´t login");
//       console.log(error);
//     }
//   };

//   const registerUserFetch = async (userInputValue: IRegisterUser) => {
//     const { registerName, registerEmail, registerPassword } = userInputValue;
//     try {
//       const response = await fetch("/api/registerUser", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           registerName,
//           registerEmail,
//           registerPassword,
//         }),
//       });
//       const data = await response.json();
//       console.log(data);
//       setLoginUser(data);
//       if (!response.ok) {
//         setErrorMessage("Gick inte att skapa");
//         return console.log("gick inte att fetcha");
//       }
//     } catch (error) {
//       setErrorMessage("Couldn´t register");
//     }
//   };

//   //
//   return (
//     <UserContext.Provider
//       value={{
//         loginUser,
//         setLoginUser,
//         email,
//         setEmail,
//         fetchLoginUser,

//         password,
//         setPassword,
//         errorMessage,
//         setErrorMessage,
//         registerName,
//         setRegisterName,
//         registerEmail,
//         setRegisterEmail,
//         registerPassword,
//         setRegisterPassword,
//         registerUserFetch,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;
