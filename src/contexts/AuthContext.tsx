"use client";

import { DatabaseService } from "@/services/database-service";
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../config/firebase";

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  loginWithEmailPassword: Function;
  createAccount: Function;
  logOut: Function;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: true,
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
  const [isLoading, setIsLoading] = useState(true);

  const loginWithEmailPassword = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Login Successful!");
      })
      .catch((error) => {
        alert(`Failed to login error code ${error.message}`);
      });
  };

  const createAccount = (email: string, password: string, username: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // ...
        DatabaseService.addUserToDatabase(userCredential.user, username);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const logOut = () => {
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
      console.log("current user " + currentUser);
      setUser(currentUser);
      setIsLoading(false);
      console.log(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, loginWithEmailPassword, createAccount, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext<AuthContextProps>(AuthContext);
};
