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
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";

interface LiveGameContextProps {
  liveGame: Game | null;
  // friendsList: Array<Friend> | null;
  // gameList: Array<GamePreview> | null;
  // getUser: () => Promise<void>;
  // getFriends: () => Promise<void>;
  // getGames: () => Promise<void>;
  setGameId: (value: string) => void;
}

const LiveGameContext = createContext<LiveGameContextProps>({
  liveGame: null,
  // friendsList: null,
  // gameList: null,
  // getUser: async () => {
  //   console.log("Error: Function not added to value prop");
  // },
  // getFriends: async () => {
  //   console.log("Error: Function not added to value prop");
  // },
  // getGames: async () => {
  //   console.log("Error: Function not added to value prop");
  // },
  setGameId: () => {
    console.log("Error: Function not added to value prop");
  },
});

interface LiveGameContextProviderProps {
  children: ReactNode;
}

export const LiveGameProvider: FC<LiveGameContextProviderProps> = ({
  children,
}) => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [liveGame, setLiveGame] = useState<Game | null>(null);

  useEffect(() => {
    let unsub = () => {};
    if (gameId) {
      unsub = onSnapshot(doc(db, "games", gameId), (doc) => {
        setLiveGame(doc.data() as Game);
      });
    }
    return () => {
      if (gameId) {
        unsub();
      }
    };
  }, [gameId]);

  return (
    <LiveGameContext.Provider value={{ liveGame, setGameId }}>
      {children}
    </LiveGameContext.Provider>
  );
};

export const useLiveGame = () => {
  return useContext<LiveGameContextProps>(LiveGameContext);
};
