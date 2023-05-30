"use client";

import { db } from "@/config/firebase";
import { Color, Game, Player, Role } from "@/models";
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
  game: Game | null;
  activePlayer: Player | null;
  setGameId: (value: string) => void;
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
  updateScore: (playerId: string, difference: number) => Promise<void>;
  updateNotes: (playerId: string, notes: string) => Promise<void>;
  updatePlayerSettings: (
    playerId: string,
    name: string,
    role: Role,
    color: Color
  ) => Promise<void>;
}

const LiveGameContext = createContext<LiveGameContextProps>({
  game: null,
  activePlayer: null,
  setGameId: async () => {
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
  updateScore: async () => {
    console.log("Error: Function not added to value prop");
  },
  updateNotes: async () => {
    console.log("Error: Function not added to value prop");
  },
  updatePlayerSettings: async () => {
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
  const [game, setGame] = useState<Game | null>(null);
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);

  useEffect(() => {
    console.log("game provider reload check");
    let unsub = () => {};
    if (gameId) {
      unsub = onSnapshot(doc(db, "games", gameId), (doc) => {
        setGame(doc.data() as Game);
      });
    }
    return () => {
      if (gameId) {
        unsub();
      }
    };
  }, [gameId]);

  useEffect(() => {
    if (!user || !game) {
      return;
    }
    for (const player of game.players) {
      if (player.id === user.id) {
        setActivePlayer(player);
        break;
      }
    }
  }, [user, game]);

  const updateScore = useCallback(
    async (playerId: string, difference: number) => {
      if (!game) {
        return;
      }

      try {
        await GameService.updatePlayer(
          game.id,
          playerId,
          null,
          null,
          difference,
          null,
          null
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [game]
  );

  const updateNotes = useCallback(
    async (playerId: string, notes: string) => {
      if (!game) {
        return;
      }

      try {
        await GameService.updatePlayer(
          game.id,
          playerId,
          null,
          null,
          null,
          notes,
          null
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [game]
  );

  const updatePlayerSettings = useCallback(
    async (playerId: string, name: string, role: Role, color: Color) => {
      if (!game) {
        return;
      }

      try {
        await GameService.updatePlayer(
          game.id,
          playerId,
          name,
          role,
          null,
          null,
          color
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [game]
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
        return await GameService.createGame(
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
      if (!game) {
        return;
      }

      try {
        await GameService.updateGame(
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
    [game]
  );
  const deleteGame = useCallback(
    async (gameId: string) => {
      if (!game) {
        return;
      }

      try {
        await GameService.deleteGame(gameId);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    [game]
  );

  return (
    <LiveGameContext.Provider
      value={{
        game,
        activePlayer,
        setGameId,
        createGame,
        updateGame,
        deleteGame,
        updateScore,
        updateNotes,
        updatePlayerSettings,
      }}
    >
      {children}
    </LiveGameContext.Provider>
  );
};

export const useGame = () => {
  return useContext<LiveGameContextProps>(LiveGameContext);
};
