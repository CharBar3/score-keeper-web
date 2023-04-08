import { db } from "@/config/firebase";
import { UserAuth } from "@/contexts/AuthContext";
import { User } from "firebase/auth";
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
} from "firebase/firestore";

export class DatabaseService {
  public static fetchFirestoreUser = async (
    userId: string
  ): Promise<FirestoreUser | null> => {
    const ref = doc(db, "users", userId);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      return snap.data() as FirestoreUser;
    } else {
      return null;
    }
  };

  public static addUserToDatabase = async (
    user: User,
    username: string
  ): Promise<void> => {
    const data: FirestoreUser = {
      id: user.uid,
      username: username,
      friends: [],
      games: [],
    };

    await setDoc(doc(db, "users", user.uid), data);
  };

  public static getUserGames = async (userId: string) => {
    const q = query(collection(db, "games"), where("owner", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
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

    const user = await this.fetchFirestoreUser(userId);

    if (!user) {
      return null;
    }

    for (const id of user.friends) {
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
}
