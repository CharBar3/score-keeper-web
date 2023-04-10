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
  gameList: Array<GamePreview> | null;
  getFriends: () => Promise<void>;
  getGames: () => Promise<void>;
}

const DataStoreContext = createContext<DataStoreContextProps>({
  friendsList: null,
  gameList: null,
  getFriends: async () => {
    console.log("Make sure to add function to value prop");
  },
  getGames: async () => {
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
  const [gameList, setGameList] = useState<Array<GamePreview> | null>(null);

  const getFriends = useCallback(async () => {
    if (!user) {
      return;
    }
    setFriendsList(await DatabaseService.fetchUserFriendsList(user.uid));
  }, [user]);

  const getGames = useCallback(async () => {
    if (!user) {
      return;
    }
    setGameList(await DatabaseService.fetchUserGameList(user.uid));
  }, [user]);

  useEffect(() => {
    console.log("loop reload check datastore");
    getFriends();
    getGames();

    // return () => {
    //   second
    // }
  }, [user, getFriends, getGames]);

  return (
    <DataStoreContext.Provider
      value={{ friendsList, gameList, getFriends, getGames }}
    >
      {children}
    </DataStoreContext.Provider>
  );
};

export const useDataStore = () => {
  return useContext<DataStoreContextProps>(DataStoreContext);
};
