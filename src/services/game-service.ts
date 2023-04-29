import { db } from "@/config/firebase";
import {
  Color,
  Friend,
  Game,
  GameCreateParams,
  GuestPlayerCreateParams,
  Player,
  PlayerAddParams,
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
  // public static addGameToUsersGames = async (
  //   gameId: string,
  //   playerIds: string[]
  // ) => {
  //   const ref = await doc(db, "users", userId);
  //   await updateDoc(ref, {
  //     games: arrayUnion(gameId),
  //   });
  // };

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
    title: string,
    info: string,
    owner: User,
    players: PlayerAddParams[],
    playerIds: string[],
    color: Color
  ): Promise<void> => {
    const newGameRef = doc(collection(db, "games"));

    playerIds.push(owner.id);

    const processedPlayers: Player[] = [
      {
        id: owner.id,
        name: owner.username,
        role: Role.Owner,
        notes: "",
        score: 0,
        color: this.colorGenerator(),
      },
    ];

    for (const player of players) {
      processedPlayers.push({
        id: player.id,
        name: player.name,
        role: player.role,
        notes: "",
        score: 0,
        color: this.colorGenerator(),
      });
    }

    // for (const guestPlayer of guestPlayers) {
    //   players.push({
    //     id: uniqid(),
    //     name: guestPlayer,
    //     role: Role.Guest,
    //     score: 0,
    //     notes: "",
    //     color: this.colorGenerator(),
    //   });
    // }

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
    // await setDoc(newGameRef, newGame);

    for (const playerId of playerIds) {
      const ref = doc(db, "users", playerId);
      batch.update(ref, {
        games: arrayUnion(newGameRef.id),
      });
    }

    await batch.commit();
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

    // return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
  };
}
