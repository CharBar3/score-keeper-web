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
} from "firebase/firestore";

export const addUserToDatabase = async (user: User, username: string) => {
  const data: DatabaseUser = {
    id: user.uid,
    username: username,
    friends: [],
    games: [],
  };

  await setDoc(doc(db, "users", user.uid), data);
};

export const getUserGames = async (userId: string) => {
  const q = query(collection(db, "games"), where("owner", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
};

export const createGame = async (userId: string, game: Game) => {};

// export const addFriend = async (userId: string) => {};

interface SearchResults {
  id: string;
  username: string;
}

export const findFriendsByUsername = async (username: string) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);

  const results: SearchResults[] = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
    const document = {
      id: doc.id,
      username: doc.data().username,
    };
    results.push(document);
  });

  return results;
};
