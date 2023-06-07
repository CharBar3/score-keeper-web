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
import { Friend, FriendShowParams, FriendStatus, Game, User } from "../models";

export class UserService {
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
  ): Promise<FriendShowParams[] | []> => {
    const friends: FriendShowParams[] = [];
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

    // Get user and friend document snaps
    const userRef = doc(db, "users", userId);
    const friendRef = doc(db, "users", friendId);
    const userSnap = await getDoc(userRef);
    const friendSnap = await getDoc(friendRef);

    // Add friend to user friendsList status pending
    // pending means the request has been sent out
    // but the request has not been accepted yet
    if (friendSnap.exists()) {
      const friendDocument = friendSnap.data() as User;

      const newFriend: Friend = {
        id: friendDocument.id,
        username: friendDocument.username,
        status: FriendStatus.Pending,
      };

      batch.update(userRef, {
        friends: arrayUnion(newFriend),
      });
    } else {
      throw new Error("addUserFriend Error: friend document does not exist");
    }

    // Add user to friends friendsList status requested
    // requested means another user has requested to be friends
    // the friend of the user can accept or decline
    if (userSnap.exists()) {
      const userDocument = userSnap.data() as User;

      const newFriend: Friend = {
        id: userDocument.id,
        username: userDocument.username,
        status: FriendStatus.Requested,
      };

      batch.update(friendRef, {
        friends: arrayUnion(newFriend),
      });
    } else {
      throw new Error("addUserFriend Error: user document does not exist");
    }

    await batch.commit();
  };

  public static removeUserFriend = async (
    friendId: string,
    userId: string
  ): Promise<void> => {
    const batch = writeBatch(db);

    // Get user and friend document snaps
    const userRef = doc(db, "users", userId);
    const friendRef = doc(db, "users", friendId);
    const userSnap = await getDoc(userRef);
    const friendSnap = await getDoc(friendRef);

    if (friendSnap.exists()) {
      const friendDocument = friendSnap.data() as User;

      const index = friendDocument.friends.findIndex(({ id }) => id === userId);

      batch.update(friendRef, {
        friends: arrayRemove(friendDocument.friends[index]),
      });
    } else {
      throw new Error("addUserFriend Error: friend document does not exist");
    }

    if (userSnap.exists()) {
      const userDocument = userSnap.data() as User;

      const index = userDocument.friends.findIndex(({ id }) => id === friendId);

      batch.update(userRef, {
        friends: arrayRemove(userDocument.friends[index]),
      });
    } else {
      throw new Error("addUserFriend Error: user document does not exist");
    }

    await batch.commit();
  };

  public static acceptUserFriend = async (
    friendId: string,
    userId: string
  ): Promise<void> => {
    const batch = writeBatch(db);

    // Get user and friend document snaps
    const userRef = doc(db, "users", userId);
    const friendRef = doc(db, "users", friendId);
    const userSnap = await getDoc(userRef);
    const friendSnap = await getDoc(friendRef);

    if (userSnap.exists()) {
      const userDocument = userSnap.data() as User;

      const userFriends = userDocument.friends;

      const friendIndex = userFriends.findIndex(({ id }) => id === friendId);

      userFriends[friendIndex].status = FriendStatus.Accepted;

      batch.update(userRef, {
        friends: [...userFriends],
      });
    } else {
      throw new Error("addUserFriend Error");
    }

    if (friendSnap.exists()) {
      const friendDocument = friendSnap.data() as User;

      const friendFriends = friendDocument.friends;

      const userIndex = friendFriends.findIndex(({ id }) => id === userId);

      friendFriends[userIndex].status = FriendStatus.Accepted;

      batch.update(friendRef, {
        friends: [...friendFriends],
      });
    } else {
      throw new Error("addUserFriend Error");
    }

    await batch.commit();
  };

  // public static removeUserFriend = async (
  //   friendId: string,
  //   userId: string
  // ): Promise<void> => {
  //   const batch = writeBatch(db);

  //   const userRef = doc(db, "users", userId);

  //   batch.update(userRef, { friends: arrayRemove(friendId) });

  //   const friendRef = doc(db, "users", friendId);
  //   batch.update(friendRef, {
  //     friends: arrayRemove(userId),
  //   });

  //   await batch.commit();
  // };

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
      const document = doc.data() as Game;
      games.push(document);
    });
    return games;
  };

  public static findFriendByUsername = async (
    search: string
  ): Promise<FriendShowParams[] | []> => {
    const username = search.toLowerCase();
    if (username.length === 0) {
      return [];
    }

    const q = query(
      collection(db, "users"),
      where("usernameSearchTerms", "array-contains", username)
    );
    const querySnapshot = await getDocs(q);

    const searchResults: FriendShowParams[] = [];
    querySnapshot.forEach((doc) => {
      const document = {
        id: doc.id,
        username: doc.data().username,
      };

      searchResults.push(document);
    });

    return searchResults;
  };

  /**
   * Checks to see if a username is available to use
   *
   * returns true if the username is available
   * returns false if the username is taken
   */
  public static checkUsername = async (username: string): Promise<boolean> => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("the query was empty");
      return true;
    }

    return false;
  };

  public static generateKeywords(name: string): string[] {
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
