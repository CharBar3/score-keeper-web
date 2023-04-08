"use client";

import { UserAuth } from "@/contexts/AuthContext";
import { DatabaseService } from "@/services/database-service";
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface DataStoreContextProps {
  friendsList: Array<Friend> | null;
  firestoreUser: FirestoreUser | null;
  getFirestoreUser: () => Promise<void>;
  getFriends: () => Promise<void>;
}

const DataStoreContext = createContext<DataStoreContextProps>({
  firestoreUser: null,
  friendsList: null,
  getFirestoreUser: async () => {
    console.log("Make sure to add function to value prop");
  },
  getFriends: async () => {
    console.log("Make sure to add function to value prop");
  },
});

interface DataStoreContextProviderProps {
  children: ReactNode;
}

export const DataStoreProvider: FC<DataStoreContextProviderProps> = ({
  children,
}) => {
  const { user } = UserAuth();
  const [firestoreUser, setFirestoreUser] = useState<FirestoreUser | null>(
    null
  );
  const [friendsList, setFriendsList] = useState<Array<Friend> | null>(null);

  const getFirestoreUser = useCallback(async () => {
    if (!user) {
      return;
    }
    setFirestoreUser(await DatabaseService.fetchFirestoreUser(user.uid));
  }, [user]);

  const getFriends = useCallback(async () => {
    if (!user || !firestoreUser) {
      return;
    }
    setFriendsList(
      await DatabaseService.getUserFriendsList(firestoreUser.friends)
    );
  }, [user, firestoreUser]);

  useEffect(() => {
    if (user) {
      getFriends();
      getFirestoreUser();
    }

    // return () => {
    //   second
    // }
  }, [user, getFriends, getFirestoreUser]);

  return (
    <DataStoreContext.Provider
      value={{ firestoreUser, friendsList, getFriends, getFirestoreUser }}
    >
      {children}
    </DataStoreContext.Provider>
  );
};

export const useDataStore = () => {
  return useContext<DataStoreContextProps>(DataStoreContext);
};
