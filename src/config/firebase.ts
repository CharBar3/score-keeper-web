// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPuUZM_zFQIow_e7tDxbqdB_w2vNVjdtU",
  authDomain: "score-keeper-8e7fc.firebaseapp.com",
  projectId: "score-keeper-8e7fc",
  storageBucket: "score-keeper-8e7fc.appspot.com",
  messagingSenderId: "164917498911",
  appId: "1:164917498911:web:f0b8873b58e0737813712a",
  measurementId: "G-ZQYKKR93LY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
export const db = getFirestore(app);
connectFirestoreEmulator(db, "localhost", 8080);
