import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAMxKZxYPXHMlV625ieO6ry74KPYzlIc9Q",
  authDomain: "upshift2-5ebdc.firebaseapp.com",
  projectId: "upshift2-5ebdc",
  storageBucket: "upshift2-5ebdc.appspot.com",
  messagingSenderId: "403454723062",
  appId: "1:403454723062:web:48f582da94ca46aa90bdd7",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const auth = getAuth();
// export const storage = getStorage(firebase);
