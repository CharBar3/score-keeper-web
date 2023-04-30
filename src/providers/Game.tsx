"use client";

import { db } from "@/config/firebase";
import { Color, Game, Player } from "@/models";
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
import { GuestPlayerCreateParams } from "@/models";
import { GameService } from "@/services/game-service";

interface LiveGameContextProps {
  liveGame: Game | null;
  // friendsList: Array<Friend> | null;
  // gameList: Array<GamePreview> | null;
  // getUser: () => Promise<void>;
  setGameId: (value: string) => void;
  addPlayer: (friendId: string, friendUsername: string) => Promise<void>;
  addGuestPlayer: (guestPlayerInfo: GuestPlayerCreateParams) => Promise<void>;
  increaseScore: (playerId: string, scoreIncrease: number) => Promise<void>;
  decreaseScore: (playerId: string, scoreDecrease: number) => Promise<void>;
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
  // friendsList: null,
  // gameList: null,
  // getUser: async () => {
  //   console.log("Error: Function not added to value prop");
  // },
  addPlayer: async () => {
    console.log("Error: Function not added to value prop");
  },
  addGuestPlayer: async () => {
    console.log("Error: Function not added to value prop");
  },
  setGameId: async () => {
    console.log("Error: Function not added to value prop");
  },
  increaseScore: async () => {
    console.log("Error: Function not added to value prop");
  },
  decreaseScore: async () => {
    console.log("Error: Function not added to value prop");
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
  const [gameId, setGameId] = useState<string | null>(null);
  const [liveGame, setLiveGame] = useState<Game | null>(null);

  const addGuestPlayer = useCallback(
    async (guestPlayerInfo: GuestPlayerCreateParams) => {
      console.log();
      if (!liveGame) {
        return;
      }

      try {
        await GameService.addGuestPlayer(liveGame.id, guestPlayerInfo);
      } catch (error) {
        console.log(error);
      }
    },
    [liveGame]
  );

  const addPlayer = useCallback(
    async (friendId: string, friendUsername: string) => {
      console.log();
      if (!liveGame) {
        return;
      }

      try {
        await GameService.addPlayer(liveGame.id, friendId, friendUsername);
      } catch (error) {
        console.log(error);
      }
    },
    [liveGame]
  );

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
      }
    },
    [liveGame]
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
      }
    },
    [liveGame]
  );
  const deleteGame = useCallback(
    async (gameId: string) => {
      console.log("delete user games called");
      if (!liveGame) {
        return;
      }

      try {
        await GameService.deleteUserGame(gameId);
      } catch (error) {
        console.log(error);
      }
    },
    [liveGame]
  );

  useEffect(() => {
    console.log("live game loop check");
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

  // useEffect(() => {}, [liveGame, addGuestPlayer]);

  return (
    <LiveGameContext.Provider
      value={{
        liveGame,
        setGameId,
        addGuestPlayer,
        addPlayer,
        increaseScore,
        decreaseScore,
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
