import { db } from "@/config/firebase";
import { UserAuth } from "@/contexts/AuthContext";
import { User as FireUser } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";

export class DatabaseService {
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

  public static addUserToDatabase = async (
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

  public static createUserGame = async (
    userId: string,
    gameInfo: CreateGame
  ): Promise<void> => {
    const loggedInUser = await this.fetchUser(userId);
    if (!loggedInUser) {
      throw Error("Not logged in!");
    }
    const newGame: Game = {
      title: gameInfo.title,
      info: gameInfo.info,
      ownerId: userId,
      adminIds: [],
      canEditIds: [],
      players: [
        {
          playerId: userId,
          name: loggedInUser.username,
          isAdmin: true,
          canEdit: true,
          notes: "",
          score: 0,
        },
      ],
      guestPlayers: [],
    };

    const docRef: DocumentReference<DocumentData> = await addDoc(
      collection(db, "games"),
      newGame
    );

    console.log(docRef);
    await this.addGame(userId, docRef.id);
    console.log("game addition complete");
  };

  /**
   * findFriendsByUsername
   * accepts the username you're searching for and the current logged in user id
   *
   */

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

  public static addGame = async (userId: string, gameId: string) => {
    const ref = await doc(db, "users", userId);
    await updateDoc(ref, {
      games: arrayUnion(gameId),
    });
  };

  public static addFriend = async (
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

  // public static getUserFriendIds = async (
  //   currentUserId: string
  // ): Promise<string[]> => {
  //   const docRef = doc(db, "users", currentUserId);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     return docSnap.data().friends;
  //   } else {
  //     console.log("The document did not exist");
  //     return ["no doc"];
  //   }
  // };

  /**
   * getUserFriendsList
   * Accepts an array of friend Id's
   * Retruns an array of friends
   * format [
   * {
   * friendId: string;
   * friendUsername: string;
   * }
   * ]
   */
  public static fetchUserFriendsList = async (
    userId: string
  ): Promise<Friend[] | null> => {
    const friendsList = [];

    const user = await this.fetchUser(userId);

    if (!user) {
      return null;
    }

    for (const id of user.friends) {
      // Get all documents at once getDocs()
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const friend = {
          friendId: docSnap.data().id,
          friendUsername: docSnap.data().username,
        };

        friendsList.push(friend);
      }
    }
    return friendsList;
  };

  public static fetchUserGameList = async (
    userId: string
  ): Promise<GamePreview[] | null> => {
    const gameList: GamePreview[] = [];

    // const user = await this.fetchFirestoreUser(userId);

    const q = query(collection(db, "games"), where("ownerId", "==", userId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      const document = doc.data();

      const game = {
        gameId: doc.id,
        gameTitle: document.title,
        gameInfo: document.info,
      };

      gameList.push(game);
    });
    return gameList;
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
