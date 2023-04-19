import { db } from "@/config/firebase";
import { User as FireUser } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export class DatabaseService {
  public static createFirestoreUserDocument = async (
    user: FireUser,
    username: string
  ): Promise<void> => {
    const data: User = {
      id: user.uid,
      username: username,
      friends: [],
      games: [],
    };

    await setDoc(doc(db, "users", user.uid), data);
  };

  public static fetchUser = async (userId: string): Promise<User | null> => {
    const ref = doc(db, "users", userId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as User;
    } else {
      return null;
    }
  };

  public static fetchUserFriends = async (
    friendIds: string[]
  ): Promise<Friend[] | []> => {
    if (friendIds.length == 0) {
      return [];
    }
    const friends: Friend[] = [];
    const q = query(collection(db, "users"), where("id", "in", friendIds));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const document = doc.data();
      const friend = {
        friendId: document.id,
        friendUsername: document.username,
      };
      friends.push(friend);
    });
    return friends;
  };

  public static addUserFriend = async (
    friendUserId: string,
    userId: string
  ): Promise<void> => {
    const ref = await doc(db, "users", userId);
    await updateDoc(ref, {
      friends: arrayUnion(friendUserId),
    });
  };

  public static removeUserFriend = async (
    friendUserId: string,
    userId: string
  ): Promise<void> => {
    const ref = await doc(db, "users", userId);
    await updateDoc(ref, {
      friends: arrayRemove(friendUserId),
    });
  };

  public static fetchUserGame = async (
    gameId: string
  ): Promise<Game | null> => {
    const ref = doc(db, "games", gameId);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      return snap.data() as Game;
    } else {
      return null;
    }
  };

  public static fetchUserGames = async (
    gameIds: string[]
  ): Promise<GamePreview[] | []> => {
    if (gameIds.length == 0) {
      return [];
    }
    const games: GamePreview[] = [];
    const q = query(collection(db, "games"), where("id", "in", gameIds));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const document = doc.data();
      const game = {
        gameId: document.id,
        gameInfo: document.info,
        gameTitle: document.title,
      };
      games.push(game);
    });
    return games;
  };

  public static createUserGame = async (
    user: User,
    gameInfo: CreateGame
  ): Promise<void> => {
    const newGame: Game = {
      title: gameInfo.title,
      info: gameInfo.info,
      ownerId: user.id,
      adminIds: [],
      canEditIds: [],
      players: [
        {
          playerId: user.id,
          name: user.username,
          isAdmin: true,
          canEdit: true,
          notes: "",
          score: 0,
        },
      ],
      guestPlayers: [],
    };

    const newGameRef = doc(collection(db, "games"));
    await setDoc(newGameRef, {
      ...newGame,
      id: newGameRef.id,
    });

    await this.addGameToUserGames(user.id, newGameRef.id);
  };

  public static addGameToUserGames = async (userId: string, gameId: string) => {
    const ref = await doc(db, "users", userId);
    await updateDoc(ref, {
      games: arrayUnion(gameId),
    });
  };

  public static findFriendByUsername = async (
    username: string,
    userId: string
  ): Promise<Friend[]> => {
    const q = query(collection(db, "users"), where("username", ">=", username));
    const querySnapshot = await getDocs(q);

    const searchResults: Friend[] = [];
    querySnapshot.forEach((doc) => {
      const document = {
        friendId: doc.id,
        friendUsername: doc.data().username,
      };

      searchResults.push(document);
    });
    return searchResults;
  };

  public static addGuestPlayer = async (
    gameId: string,
    guestInfo: GuestPlayer
  ): Promise<void> => {
    const gameDocRef = doc(db, "users", gameId);
    try {
      await updateDoc(gameDocRef, {
        guestPlayers: arrayUnion(guestInfo),
      });
    } catch (error) {}
  };
}
