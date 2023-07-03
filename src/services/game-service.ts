import { db } from "@/config/firebase";
import { Color, Game, IconNames, Player, Role, User } from "@/models";
import { DateTime } from "luxon";
import {
  DocumentData,
  DocumentReference,
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
          player.notes = notes ?? player.notes;
          player.color = color ?? player.color;
          player.score += score ?? 0;

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
    color: Color,
    icon: IconNames
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
    const timestamp = DateTime.now().toUTC().toISO();

    const newGame: Game = {
      id: newGameRef.id,
      title: title,
      info: info,
      ownerId: owner.id,
      playerIds: playerIds,
      players: processedPlayers,
      color: color,
      joinInfo: { code: joinCode, createdAt: timestamp! },
      createdAt: timestamp!,
      icon,
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
    newColor: Color,
    newIcon: IconNames
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
        icon: newIcon,
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

  public static joinGame = async (
    userId: string,
    gameName: string,
    joinCode: string
  ): Promise<string> => {
    const gamesRef = collection(db, "games");
    const q = query(gamesRef, where("joinInfo.code", "==", joinCode));
    const querySnapshot = await getDocs(q);

    const newPlayer = {
      id: userId,
      name: gameName,
      role: Role.Edit,
      notes: "",
      score: 0,
      color: this.colorGenerator(),
    };

    let gameId = "";

    querySnapshot.forEach((doc) => {
      gameId = doc.id;
    });

    const gameRef = doc(db, "games", gameId);
    const gameSnap = await getDoc(gameRef);

    if (gameSnap.exists()) {
      const gameDoc = gameSnap.data();

      if (!gameDoc.playerIds.includes(userId)) {
        await updateDoc(gameRef, {
          players: [...gameDoc.players, newPlayer],
          playerIds: [...gameDoc.playerIds, newPlayer.id],
        });
      }
    }

    return gameId;
  };

  public static generateNewCode = async (gameId: string) => {
    const gameRef = doc(db, "games", gameId);
    await updateDoc(gameRef, {
      joinInfo: {
        code: await this.codeGenerator(),
        createdAt: DateTime.now().toUTC().toISO(),
      },
    });
  };

  public static codeGenerator = async (): Promise<string> => {
    const possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const randomChar = () => {
      return Math.floor(Math.random() * possibleCharacters.length);
    };

    const joinCode =
      possibleCharacters[randomChar()] +
      possibleCharacters[randomChar()] +
      possibleCharacters[randomChar()] +
      possibleCharacters[randomChar()];

    const gamesRef = collection(db, "games");
    const q = query(gamesRef, where("joinInfo.code", "==", joinCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return joinCode;
    }

    querySnapshot.forEach(async (doc) => {
      const gameDoc = doc.data();

      const secondsSinceCreated =
        DateTime.now().toUTC().toSeconds() -
        DateTime.fromISO(gameDoc.joinInfo.createdAt).toSeconds();

      if (secondsSinceCreated > 86400) {
        await updateDoc(doc.ref, {
          joinInfo: null,
        });
        return joinCode;
      }
    });

    return await this.codeGenerator();
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
