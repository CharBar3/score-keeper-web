"use client";

import { DatabaseService } from "@/services/database-service";
import {
  User,
  createUserWithEmailAndPassword,
  deleteUser,
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
import { FirebaseError } from "firebase/app";

interface AuthContextProps {
  fireUser: User | null;
  isLoading: boolean;
  loginWithEmailPassword: Function;
  createAccount: Function;
  logOut: Function;
}

const AuthContext = createContext<AuthContextProps>({
  fireUser: null,
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

export const AuthProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [fireUser, setFireUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginWithEmailPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // TODO: Create error handler and pass error to it
      if (error instanceof FirebaseError) {
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/wrong-password"
        ) {
          throw new Error("Invalid email or password");
        }
      }
      console.error(error);
      throw error;
    }
  };

  const createAccount = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await DatabaseService.createFirestoreUserDocument(
        userCredential.user,
        username
      );
    } catch (error) {
      if (fireUser) {
        await deleteUser(fireUser);
      }
      console.log("Auth Provider Error " + error);
      throw error;
    }

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     DatabaseService.createFirestoreUserDocument(
    //       userCredential.user,
    //       username
    //     );
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode);
    //     console.log(errorMessage);
    //     // ..
    //   });
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFireUser(currentUser);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        fireUser,
        isLoading,
        loginWithEmailPassword,
        createAccount,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext<AuthContextProps>(AuthContext);
};
