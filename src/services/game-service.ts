import { db } from "@/config/firebase";
import { Color, Game, Player, User } from "@/models";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

export class GameService {
  public static increaseScore = async (
    gameId: string,
    playerId: string,
    scoreIncrease: number
  ): Promise<void> => {
    const gameRef = doc(db, "games", gameId);

    const docSnap = await getDoc(gameRef);

    if (docSnap.exists()) {
      const document = docSnap.data();

      for (const player of document.players as Player[]) {
        if (player.id == playerId) {
          player.score += scoreIncrease;
          await updateDoc(gameRef, {
            players: [...document.players],
          });
        }
      }
    } else {
      console.log("no player exists");
    }
  };
  public static decreaseScore = async (
    gameId: string,
    playerId: string,
    scoreIncrease: number
  ): Promise<void> => {
    const gameRef = doc(db, "games", gameId);

    const docSnap = await getDoc(gameRef);

    if (docSnap.exists()) {
      const document = docSnap.data();

      for (const player of document.players as Player[]) {
        if (player.id == playerId) {
          player.score -= scoreIncrease;
          await updateDoc(gameRef, {
            players: [...document.players],
          });
        }
      }
    } else {
      console.log("no player exists");
    }
  };

  public static updateNotes = async (
    gameId: string,
    playerId: string,
    notes: string
  ): Promise<void> => {
    const gameRef = doc(db, "games", gameId);

    const docSnap = await getDoc(gameRef);

    if (docSnap.exists()) {
      const document = docSnap.data();

      for (const player of document.players as Player[]) {
        if (player.id == playerId) {
          player.notes = notes;
          await updateDoc(gameRef, {
            players: [...document.players],
          });
        }
      }
    } else {
      console.log("no player exists");
    }
  };

  public static createUserGame = async (
    title: string,
    info: string,
    owner: User,
    players: Player[],
    playerIds: string[],
    color: Color
  ): Promise<string> => {
    const newGameRef = doc(collection(db, "games"));

    const processedPlayers: Player[] = [];

    for (const player of players) {
      processedPlayers.push({
        id: player.id,
        name: player.name,
        role: player.role,
        notes: "",
        score: 0,
        color: player.color,
      });
    }

    const newGame: Game = {
      id: newGameRef.id,
      title: title,
      info: info,
      ownerId: owner.id,
      playerIds: playerIds,
      players: processedPlayers,
      color: color,
    };

    const batch = writeBatch(db);

    batch.set(newGameRef, newGame);

    for (const playerId of playerIds) {
      const ref = doc(db, "users", playerId);
      batch.update(ref, {
        games: arrayUnion(newGameRef.id),
      });
    }

    await batch.commit();
    return newGameRef.id;
  };

  public static updateUserGame = async (
    gameId: string,
    newTitle: string,
    newInfo: string,
    newPlayers: Player[],
    newPlayerIds: string[],
    newColor: Color
  ): Promise<void> => {
    const gameRef = doc(db, "games", gameId);
    const gameSnap = await getDoc(gameRef);

    if (gameSnap.exists()) {
      const currentGameDoc = gameSnap.data();

      const batch = writeBatch(db);

      for (const playerId of currentGameDoc.playerIds) {
        if (!newPlayerIds.includes(playerId)) {
          const ref = doc(db, "users", playerId);
          batch.update(ref, {
            games: arrayRemove(gameId),
          });
        }
      }

      for (const playerId of newPlayerIds) {
        if (!currentGameDoc.playerIds.includes(playerId)) {
          const ref = doc(db, "users", playerId);
          batch.update(ref, {
            games: arrayUnion(gameId),
          });
        }
      }

      batch.update(gameRef, {
        title: newTitle,
        info: newInfo,
        playerIds: newPlayerIds,
        players: newPlayers,
        color: newColor,
      });

      await batch.commit();
    } else {
      throw new Error("Game does not exist");
    }
  };

  public static deleteUserGame = async (gameId: string): Promise<void> => {
    const gameRef = doc(db, "games", gameId);
    const gameSnap = await getDoc(gameRef);

    if (gameSnap.exists()) {
      const currentGameDoc = gameSnap.data();

      const batch = writeBatch(db);

      for (const playerId of currentGameDoc.playerIds) {
        const ref = doc(db, "users", playerId);
        batch.update(ref, {
          games: arrayRemove(gameId),
        });
      }

      batch.delete(gameRef);

      await batch.commit();
    } else {
      throw new Error("Game does not exist");
    }
  };

  public static colorGenerator = (): Color => {
    const randomNumber = () => {
      return Math.floor(Math.random() * 256);
    };

    return {
      red: randomNumber(),
      green: randomNumber(),
      blue: randomNumber(),
    };
  };
}
