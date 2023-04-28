import { db } from "@/config/firebase";
import {
  Game,
  GameCreateParams,
  GuestPlayerCreateParams,
  Player,
  Role,
  User,
} from "@/models";
import { green } from "@mui/material/colors";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import uniqid from "uniqid";

export class GameService {
  public static addGameToUserGames = async (userId: string, gameId: string) => {
    const ref = await doc(db, "users", userId);
    await updateDoc(ref, {
      games: arrayUnion(gameId),
    });
  };

  public static addPlayer = async (
    gameId: string,
    friendId: string,
    friendUsername: string
  ): Promise<void> => {
    // const batch = writeBatch(db);

    // // Add friendId to user friends list
    // const userRef = doc(db, "users", userId);
    // batch.update(userRef, { friends: arrayUnion(friendId) });

    // // Add userId to friend's friends list
    // const friendRef = doc(db, "users", friendId);
    // batch.update(friendRef, {
    //   friends: arrayUnion(userId),
    // });

    // await batch.commit();

    const newPlayer: Player = {
      id: friendId,
      name: friendUsername,
      notes: "",
      role: Role.Edit,
      score: 0,
      isGuest: false,
      color: this.colorGenerator(),
    };

    const gameRef = doc(db, "games", gameId);
    await updateDoc(gameRef, {
      players: arrayUnion(newPlayer),
      playerIds: arrayUnion(friendId),
    });
  };

  public static addGuestPlayer = async (
    gameId: string,
    guestInfo: GuestPlayerCreateParams
  ): Promise<void> => {
    const gameDocRef = doc(db, "games", gameId);
    await updateDoc(gameDocRef, {
      players: arrayUnion({ ...guestInfo, id: uniqid() }),
    });
  };

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
  public static createUserGame = async (
    user: User,
    gameInfo: GameCreateParams
  ): Promise<void> => {
    const newGameRef = doc(collection(db, "games"));

    const color = this.colorGenerator();

    const newGame: Game = {
      id: newGameRef.id,
      title: gameInfo.title,
      info: gameInfo.info,
      ownerId: user.id,
      playerIds: [user.id],
      color: color,
      players: [
        {
          id: user.id,
          name: user.username,
          role: Role.Owner,
          notes: "",
          score: 0,
          isGuest: false,
          color: this.colorGenerator(),
        },
      ],
    };

    await setDoc(newGameRef, newGame);

    await this.addGameToUserGames(user.id, newGameRef.id);
  };

  public static colorGenerator = () => {
    const randomNumber = () => {
      return Math.floor(Math.random() * 256);
    };

    return {
      red: randomNumber(),
      green: randomNumber(),
      blue: randomNumber(),
    };

    // return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
  };
}
