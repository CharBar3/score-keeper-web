import { db } from "@/config/firebase";
import { GuestPlayerCreateParams, Player, Role } from "@/models";
import {
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import uniqid from "uniqid";

export class GameService {
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
}
