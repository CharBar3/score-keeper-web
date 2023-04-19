"use client";

import { db } from "@/config/firebase";
import { UserAuth } from "@/contexts/AuthContext";
import { DatabaseService } from "@/services/database-service";
import { doc, onSnapshot } from "firebase/firestore";
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
  getFriends: () => Promise<void>;
  getGames: () => Promise<void>;
}

const DataStoreContext = createContext<DataStoreContextProps>({
  user: null,
  friendsList: null,
  gameList: null,
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

  const [friendsList, setFriendsList] = useState<Array<Friend> | null>(null);
  const [gameList, setGameList] = useState<Array<GamePreview> | null>(null);

  const getFriends = useCallback(async () => {
    if (!user) {
      console.log("no user");
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

    let unsub = () => {};
    if (fireUser) {
      unsub = onSnapshot(doc(db, "users", fireUser.uid), (doc) => {
        setUser(doc.data() as User);
      });
    }

    return () => {
      if (fireUser) {
        unsub();
      }
    };
  }, [fireUser]);

  useEffect(() => {
    getFriends();
    getGames();
  }, [user, getFriends, getGames]);

  return (
    <DataStoreContext.Provider
      value={{ user, friendsList, gameList, getFriends, getGames }}
    >
      {children}
    </DataStoreContext.Provider>
  );
};

export const useDataStore = () => {
  return useContext<DataStoreContextProps>(DataStoreContext);
};
