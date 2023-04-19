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
  user: User | null;
  friendsList: Array<Friend> | null;
  gameList: Array<GamePreview> | null;
  getUser: () => Promise<void>;
  getFriends: () => Promise<void>;
  getGames: () => Promise<void>;
}

const DataStoreContext = createContext<DataStoreContextProps>({
  user: null,
  friendsList: null,
  gameList: null,
  getUser: async () => {
    console.log("Error: Function not added to value prop");
  },
  getFriends: async () => {
    console.log("Error: Function not added to value prop");
  },
  getGames: async () => {
    console.log("Error: Function not added to value prop");
  },
});

interface DataStoreContextProviderProps {
  children: ReactNode;
}

export const DataStoreProvider: FC<DataStoreContextProviderProps> = ({
  children,
}) => {
  const { fireUser } = UserAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<true | false>(true);

  const [friendsList, setFriendsList] = useState<Array<Friend> | null>(null);
  const [gameList, setGameList] = useState<Array<GamePreview> | null>(null);

  const getUser = useCallback(async () => {
    if (!fireUser) {
      return;
    }
    setUser(await DatabaseService.fetchUser(fireUser.uid));
    setIsLoading(false);
  }, [fireUser]);

  const getFriends = useCallback(async () => {
    if (!user) {
      console.log("no user friends");
      return;
    }
    setFriendsList(await DatabaseService.fetchUserFriends(user.friends));
  }, [user]);

  const getGames = useCallback(async () => {
    if (!fireUser) {
      return;
    }
    setGameList(await DatabaseService.fetchUserGameList(fireUser.uid));
  }, [fireUser]);

  useEffect(() => {
    console.log("loop reload check datastore");
    if (isLoading) {
      getUser();
    } else {
      getFriends();
      getGames();
    }
    // return () => {
    //   second
    // }
  }, [fireUser, isLoading, getUser, getFriends, getGames]);

  return (
    <DataStoreContext.Provider
      value={{ user, friendsList, gameList, getFriends, getGames, getUser }}
    >
      {children}
    </DataStoreContext.Provider>
  );
};

export const useDataStore = () => {
  return useContext<DataStoreContextProps>(DataStoreContext);
};
