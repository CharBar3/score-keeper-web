"use client";

import {
  FC,
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { auth } from "../config/firebase";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

interface AuthContextProps {
  user: User | null;
  loginWithEmailPassword: Function;
  createAccount: Function;
  logOut: Function;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loginWithEmailPassword: () => {
    console.log("Make sure function is added to value prop");
  },
  createAccount: () => {
    console.log("Make sure function is added to value prop");
  },
  logOut: () => {
    console.log("Make sure function is added to value prop");
  },
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const loginWithEmailPassword = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const createAccount = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const logOut = () => {
    console.log("logut happens");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loginWithEmailPassword, createAccount, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext<AuthContextProps>(AuthContext);
};
