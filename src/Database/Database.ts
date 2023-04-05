import { db } from "@/config/firebase";
import { User } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

export const addUserToDatabase = async (user: User, username: string) => {
  await setDoc(doc(db, "users", user.uid), {
    name: username,
  });
};

export const getUserGames = async (userId: string) => {
  const q = query(collection(db, "games"), where("owner", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
};
