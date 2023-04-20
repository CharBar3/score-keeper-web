import { db } from "@/config/firebase";
import { GuestPlayerCreateParams, Player, Role } from "@/models";
import { arrayUnion, doc, updateDoc, writeBatch } from "firebase/firestore";
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
      guestPlayers: arrayUnion({ ...guestInfo, id: uniqid() }),
    });
  };
}
