"use client";

import { Friend, User, GameCreateParams, Game, Color, Player } from "../models";
import { db } from "@/config/firebase";
import { useAuth } from "@/providers/Auth";
import { DatabaseService } from "@/services/database-service";
import { GameService } from "@/services/game-service";
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
  gameList: Array<Game> | null;
  getFriends: () => Promise<void>;
  getGames: () => Promise<void>;
  addFriend: (friendId: string) => Promise<void>;
  removeFriend: (friendId: string) => Promise<void>;

  findFriend: (username: string) => Promise<Friend[] | []>;
  generateRandomColor: () => Color;
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
  addFriend: async () => {
    console.log("Error: Function not added to value prop");
  },
  removeFriend: async () => {
    console.log("Error: Function not added to value prop");
  },
  findFriend: async () => {
    console.log("Error: Function not added to value prop");
    return [];
  },
  generateRandomColor: () => {
    console.log("Error: Function not added to value prop");
    return {} as Color;
  },
});

interface DataStoreContextProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<DataStoreContextProviderProps> = ({
  children,
}) => {
  const { fireUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  const [friendsList, setFriendsList] = useState<Array<Friend> | null>(null);
  const [gameList, setGameList] = useState<Array<Game> | null>(null);

  const getFriends = useCallback(async () => {
    if (!user) {
      return;
    }
    setFriendsList(await DatabaseService.fetchUserFriends(user.id));
  }, [user]);

  const getGames = useCallback(async () => {
    if (!user) {
      return;
    }
    setGameList(await DatabaseService.fetchUserGames(user.id));
  }, [user]);

  const addFriend = useCallback(
    async (friendId: string) => {
      if (!user) {
        return;
      }
      await DatabaseService.addUserFriend(friendId, user.id);
    },
    [user]
  );

  const removeFriend = useCallback(
    async (friendId: string) => {
      if (!user) {
        return;
      }
      await DatabaseService.removeUserFriend(friendId, user.id);
    },
    [user]
  );

  const generateRandomColor = useCallback(() => {
    const color = GameService.colorGenerator();
    return color;
  }, []);

  const findFriend = useCallback(
    async (username: string) => {
      if (!user) {
        return [];
      }

      try {
        return await DatabaseService.findFriendByUsername(username);
      } catch (error) {
        console.log(error);
        throw Error;
      }
    },
    [user]
  );

  useEffect(() => {
    console.log("loop reload check datastore");

    let unsub = () => {};
    if (fireUser) {
      unsub = onSnapshot(doc(db, "users", fireUser.uid), (doc) => {
        setUser(doc.data() as User);
      });
    }

    return () => {
      unsub();
    };
  }, [fireUser]);

  useEffect(() => {
    getFriends();
    getGames();
  }, [user, getFriends, getGames]);

  return (
    <DataStoreContext.Provider
      value={{
        user,
        friendsList,
        gameList,
        getFriends,
        getGames,
        removeFriend,
        addFriend,
        findFriend,
        generateRandomColor,
      }}
    >
      {children}
    </DataStoreContext.Provider>
  );
};

export const useDataStore = () => {
  return useContext<DataStoreContextProps>(DataStoreContext);
};
