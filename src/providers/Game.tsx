"use client";

import { db } from "@/config/firebase";
import { Color, Game, Player } from "@/models";
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
import { useDataStore } from "./User";

interface LiveGameContextProps {
  liveGame: Game | null;
  setGameId: (value: string) => void;
  increaseScore: (playerId: string, scoreIncrease: number) => Promise<void>;
  decreaseScore: (playerId: string, scoreDecrease: number) => Promise<void>;
  createGame: (
    title: string,
    info: string,
    players: Player[],
    playerIds: string[],
    color: Color
  ) => Promise<string | void>;
  updateGame: (
    gameId: string,
    newTitle: string,
    newInfo: string,
    newPlayers: Player[],
    newPlayerIds: string[],
    newColor: Color
  ) => Promise<void>;
  deleteGame: (gameId: string) => Promise<void>;
  updateNotes: (playerId: string, notes: string) => Promise<void>;
}

const LiveGameContext = createContext<LiveGameContextProps>({
  liveGame: null,
  setGameId: async () => {
    console.log("Error: Function not added to value prop");
  },
  increaseScore: async () => {
    console.log("Error: Function not added to value prop");
  },
  decreaseScore: async () => {
    console.log("Error: Function not added to value prop");
  },
  createGame: async () => {
    console.log("Error: Function not added to value prop");
    return "";
  },
  updateGame: async () => {
    console.log("Error: Function not added to value prop");
  },
  deleteGame: async () => {
    console.log("Error: Function not added to value prop");
  },
  updateNotes: async () => {
    console.log("Error: Function not added to value prop");
  },
});

interface LiveGameContextProviderProps {
  children: ReactNode;
}

export const GameProvider: FC<LiveGameContextProviderProps> = ({
  children,
}) => {
  const { user } = useDataStore();

  const [gameId, setGameId] = useState<string | null>(null);
  const [liveGame, setLiveGame] = useState<Game | null>(null);

  const increaseScore = useCallback(
    async (playerId: string, scoreIncrease: number) => {
      console.log();
      if (!liveGame) {
        return;
      }

      try {
        await GameService.increaseScore(liveGame.id, playerId, scoreIncrease);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [liveGame]
  );
  const decreaseScore = useCallback(
    async (playerId: string, scoreDecrease: number) => {
      if (!liveGame) {
        return;
      }

      try {
        await GameService.decreaseScore(liveGame.id, playerId, scoreDecrease);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [liveGame]
  );
  const updateNotes = useCallback(
    async (playerId: string, notes: string) => {
      if (!liveGame) {
        return;
      }

      try {
        await GameService.updateNotes(liveGame.id, playerId, notes);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [liveGame]
  );

  const createGame = useCallback(
    async (
      title: string,
      info: string,
      players: Player[],
      playerIds: string[],
      color: Color
    ) => {
      if (!user) {
        return;
      }
      try {
        return await GameService.createUserGame(
          title,
          info,
          user,
          players,
          playerIds,
          color
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [user]
  );

  const updateGame = useCallback(
    async (
      gameId: string,
      newTitle: string,
      newInfo: string,
      newPlayers: Player[],
      newPlayerIds: string[],
      newColor: Color
    ) => {
      if (!liveGame) {
        return;
      }

      try {
        await GameService.updateUserGame(
          gameId,
          newTitle,
          newInfo,
          newPlayers,
          newPlayerIds,
          newColor
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [liveGame]
  );
  const deleteGame = useCallback(
    async (gameId: string) => {
      if (!liveGame) {
        return;
      }

      try {
        await GameService.deleteUserGame(gameId);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [liveGame]
  );

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
    <LiveGameContext.Provider
      value={{
        liveGame,
        setGameId,
        increaseScore,
        decreaseScore,
        createGame,
        updateGame,
        deleteGame,
        updateNotes,
      }}
    >
      {children}
    </LiveGameContext.Provider>
  );
};

export const useGame = () => {
  return useContext<LiveGameContextProps>(LiveGameContext);
};
