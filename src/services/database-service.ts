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
  where,
  writeBatch,
} from "firebase/firestore";
import { Friend, Game, User } from "../models";

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
      usernameSearchTerms: this.generateKeywords(username),
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
    userId: string
  ): Promise<Friend[] | []> => {
    const friends: Friend[] = [];
    const q = query(
      collection(db, "users"),
      where("friends", "array-contains", userId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const document = doc.data();
      const friend = {
        id: document.id,
        username: document.username,
      };
      friends.push(friend);
    });
    return friends;
  };

  public static addUserFriend = async (
    friendId: string,
    userId: string
  ): Promise<void> => {
    const batch = writeBatch(db);

    // Add friendId to user friends list
    const userRef = doc(db, "users", userId);
    batch.update(userRef, { friends: arrayUnion(friendId) });

    // Add userId to friend's friends list
    const friendRef = doc(db, "users", friendId);
    batch.update(friendRef, {
      friends: arrayUnion(userId),
    });

    await batch.commit();
  };

  public static removeUserFriend = async (
    friendId: string,
    userId: string
  ): Promise<void> => {
    // const ref = await doc(db, "users", userId);
    // await updateDoc(ref, {
    //   friends: arrayRemove(friendUserId),
    // });

    const batch = writeBatch(db);

    // Add friendId to user friends list
    const userRef = doc(db, "users", userId);
    batch.update(userRef, { friends: arrayRemove(friendId) });

    // Add userId to friend's friends list
    const friendRef = doc(db, "users", friendId);
    batch.update(friendRef, {
      friends: arrayRemove(userId),
    });

    await batch.commit();
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
    userId: string
  ): Promise<Game[] | []> => {
    const games: Game[] = [];
    const q = query(
      collection(db, "games"),
      where("playerIds", "array-contains", userId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const document = doc.data();
      const game = {
        id: document.id,
        title: document.title,
        info: document.info,
        ownerId: document.ownerId,
        playerIds: document.playerIds,
        players: document.playerIds,
        color: document.color,
      };
      games.push(game);
    });
    return games;
  };

  public static findFriendByUsername = async (
    search: string
  ): Promise<Friend[] | []> => {
    const username = search.toLowerCase();
    if (username.length === 0) {
      return [];
    }

    const q = query(
      collection(db, "users"),
      where("usernameSearchTerms", "array-contains", username)
    );
    const querySnapshot = await getDocs(q);

    const searchResults: Friend[] = [];
    querySnapshot.forEach((doc) => {
      const document = {
        id: doc.id,
        username: doc.data().username,
      };

      searchResults.push(document);
    });

    return searchResults;
  };

  static generateKeywords(name: string): string[] {
    const words = name.split(" ");
    const keywords = [...createKeywords(`${name}`)];

    for (const word of words) {
      keywords.push(...createKeywords(word));
    }

    const removeDuplicates = [...new Set(keywords)];
    return removeDuplicates;

    function createKeywords(text: string): string[] {
      const arrName: string[] = [];
      let currName = "";

      for (const char of text.toLowerCase()) {
        if (char !== " ") {
          currName += char;
          arrName.push(currName);
        }
      }
      return arrName;
    }
  }
}
