import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtwVhxLOeOH-Vzxw_5iAXrZAnkZoy7vis",
  authDomain: "upshift-e484e.firebaseapp.com",
  projectId: "upshift-e484e",
  storageBucket: "upshift-e484e.appspot.com",
  messagingSenderId: "374818272374",
  appId: "1:374818272374:web:85c707857fccf851961b57",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const auth = getAuth();
