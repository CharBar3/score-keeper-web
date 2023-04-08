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
  getFriends: () => Promise<void>;
}

const DataStoreContext = createContext<DataStoreContextProps>({
  friendsList: null,
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

  const [friendsList, setFriendsList] = useState<Array<Friend> | null>(null);

  const getFriends = useCallback(async () => {
    if (!user) {
      return;
    }
    setFriendsList(await DatabaseService.fetchUserFriendsList(user.uid));
  }, [user]);

  useEffect(() => {
    console.log("loop reload check datastore");
    getFriends();

    // return () => {
    //   second
    // }
  }, [user, getFriends]);

  return (
    <DataStoreContext.Provider value={{ friendsList, getFriends }}>
      {children}
    </DataStoreContext.Provider>
  );
};

export const useDataStore = () => {
  return useContext<DataStoreContextProps>(DataStoreContext);
};
