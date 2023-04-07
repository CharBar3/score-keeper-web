import { db } from "@/config/firebase";
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
} from "firebase/firestore";

interface SearchResults {
  id: string;
  username: string;
}

export class DatabaseService {
  public static addUserToDatabase = async (user: User, username: string) => {
    const data: DatabaseUser = {
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

  public static findFriendsByUsername = async (username: string) => {
    const q = query(collection(db, "users"), where("username", ">=", username));
    const querySnapshot = await getDocs(q);
    const results: SearchResults[] = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, "=>", doc.data());
      const document = {
        id: doc.id,
        username: doc.data().username,
      };
      results.push(document);
    });
    return results;
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
}
