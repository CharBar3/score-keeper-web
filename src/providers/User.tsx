"use client";

import { db } from "@/config/firebase";
import { useAuth } from "@/providers/Auth";
import { GameService } from "@/services/game-service";
import { UserService } from "@/services/user-service";
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
import { Color, Friend, FriendShowParams, Game, User } from "../models";

interface DataStoreContextProps {
  user: User | null;
  friendsList: Array<Friend> | null;
  gameList: Array<Game> | null;
  // getFriends: () => Promise<void>;
  getGames: () => Promise<void>;
  addFriend: (friendId: string) => Promise<void>;
  removeFriend: (friendId: string) => Promise<void>;
  acceptFriend: (friendId: string) => Promise<void>;
  findFriend: (username: string) => Promise<FriendShowParams[] | []>;
  generateRandomColor: () => Color;
}

const DataStoreContext = createContext<DataStoreContextProps>({
  user: null,
  friendsList: null,
  gameList: null,
  // getFriends: async () => {
  //   console.log("Error: Function not added to value prop");
  // },
  getGames: async () => {
    console.log("Error: Function not added to value prop");
  },
  addFriend: async () => {
    console.log("Error: Function not added to value prop");
  },
  removeFriend: async () => {
    console.log("Error: Function not added to value prop");
  },
  acceptFriend: async () => {
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

  // const getFriends = useCallback(async () => {
  //   if (!user) {
  //     return;
  //   }
  //   setFriendsList(await UserService.fetchUserFriends(user.id));
  // }, [user]);

  const getGames = useCallback(async () => {
    if (!user) {
      return;
    }
    setGameList(await UserService.fetchUserGames(user.id));
  }, [user]);

  const addFriend = useCallback(
    async (friendId: string) => {
      if (!user) {
        return;
      }
      await UserService.addUserFriend(friendId, user.id);
    },
    [user]
  );

  const removeFriend = useCallback(
    async (friendId: string) => {
      if (!user) {
        return;
      }
      await UserService.removeUserFriend(friendId, user.id);
    },
    [user]
  );

  const acceptFriend = useCallback(
    async (friendId: string) => {
      if (!user) {
        return;
      }
      await UserService.acceptUserFriend(friendId, user.id);
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
        return await UserService.findFriendByUsername(username);
      } catch (error) {
        console.log(error);
        throw Error;
      }
    },
    [user]
  );

  useEffect(() => {
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
    // getFriends();
    getGames();
  }, [
    user,
    //  getFriends,
    getGames,
  ]);

  return (
    <DataStoreContext.Provider
      value={{
        user,
        friendsList,
        gameList,
        // getFriends,
        getGames,
        removeFriend,
        addFriend,
        findFriend,
        acceptFriend,
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
