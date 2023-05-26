"use client";

import { UserService } from "@/services/user-service";
import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  User,
  createUserWithEmailAndPassword,
  deleteUser,
  linkWithCredential,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInAnonymously,
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
  fireUser: User | null;
  isLoading: boolean;
  loginWithEmailPassword: Function;
  createAnonymousAccount: Function;
  upgradeAnonymousAccount: Function;
  createAccount: Function;
  logOut: Function;
  resetPassword: Function;
}

const AuthContext = createContext<AuthContextProps>({
  fireUser: null,
  isLoading: true,
  loginWithEmailPassword: () => {
    console.log("Make sure function is added to value prop");
  },

  createAnonymousAccount: () => {
    console.log("Make sure function is added to value prop");
  },
  upgradeAnonymousAccount: () => {
    console.log("Make sure function is added to value prop");
  },
  createAccount: () => {
    console.log("Make sure function is added to value prop");
  },
  logOut: () => {
    console.log("Make sure function is added to value prop");
  },
  resetPassword: () => {
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

  const createAnonymousAccount = async (username: string) => {
    try {
      const anonymousUserCredentials = await signInAnonymously(auth);
      await UserService.createFirestoreUserDocument(
        anonymousUserCredentials.user,
        username
      );
    } catch (error) {
      if (fireUser) {
        await deleteUser(fireUser);
      }
      console.log(error);
    }
  };

  const upgradeAnonymousAccount = async (email: string, password: string) => {
    if (!auth.currentUser) {
      return;
    }
    try {
      const currentUser = auth.currentUser;
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(currentUser, credential);

      console.log("account upgraded");
    } catch (error) {
      console.log(error);
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
      await UserService.createFirestoreUserDocument(
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
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const resetPassword = async (email: string) => {
    console.log("reset password email");
    console.log(email);
    try {
      await sendPasswordResetEmail(auth, email);
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
        createAnonymousAccount,
        upgradeAnonymousAccount,
        createAccount,
        logOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext<AuthContextProps>(AuthContext);
};
