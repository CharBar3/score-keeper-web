import { db } from "@/config/firebase";
import { Color, Game, Player, Role, User } from "@/models";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

export class GameService {
  public static updatePlayer = async (
    gameId: string,
    playerId: string,
    name?: string | null,
    role?: Role | null,
    score?: number | null,
    notes?: string | null,
    color?: Color | null
  ) => {
    const gameRef = doc(db, "games", gameId);
    const gameSnap = await getDoc(gameRef);

    if (gameSnap.exists()) {
      const gameDoc = gameSnap.data();

      for (const player of gameDoc.players) {
        if (player.id === playerId) {
          player.name = name ?? player.name;
          player.role = role ?? player.role;
          player.score += score ?? player.score;
          player.notes = notes ?? player.notes;
          player.color = color ?? player.color;

          await updateDoc(gameRef, {
            players: [...gameDoc.players],
          });
          break;
        }
      }
    } else {
      console.log("gamedoc does not exists");
    }
  };

  public static createGame = async (
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

    const joinCode = await this.codeGenerator();

    const newGame: Game = {
      id: newGameRef.id,
      title: title,
      info: info,
      ownerId: owner.id,
      playerIds: playerIds,
      players: processedPlayers,
      color: color,
      joinCode: joinCode,
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

  public static updateGame = async (
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

  public static deleteGame = async (gameId: string): Promise<void> => {
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

  public static codeGenerator = async (): Promise<string> => {
    console.log("codeGen called");
    const randomNumber = () => {
      return Math.floor(Math.random() * possibleCharacters.length);
    };

    const possibleCharacters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const joinCode =
      possibleCharacters[randomNumber()] +
      possibleCharacters[randomNumber()] +
      possibleCharacters[randomNumber()] +
      possibleCharacters[randomNumber()];

    // Checks to see if the code is already used
    const checkCode = async (): Promise<boolean> => {
      const gamesRef = collection(db, "games");
      const q = query(gamesRef, where("joinCode", "==", joinCode));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        return true;
      }

      return false;
    };

    const codeNotSafe = await checkCode();

    if (codeNotSafe) {
      return this.codeGenerator();
    }

    return joinCode;
  };

  public static colorGenerator = (): Color => {
    // console.log("color generator called");
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
