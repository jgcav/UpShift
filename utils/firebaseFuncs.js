import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import firebase from "../config/firebase";
const db = firebase.firestore();
const storage = getStorage();

export const getProfile = async (userId) => {
  const ref = doc(db, "profiles", `${userId}`);
  try {
    const snapshot = await getDoc(ref);
    return snapshot.data();
  } catch (e) {
    console.log(e);
  }
};

export const getRoutes = async (userId) => {
  const ref = collection(db, "profiles", `${userId}`, "routes");
  try {
    const snapshot = await getDocs(ref);
    const routeInfo = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      routeInfo.push({ id, ...data });
    });
    return routeInfo;
  } catch (e) {
    console.log(e);
  }
};

export const getProfilePicture = async (userId) => {
  const pathReference = ref(storage, `images/${userId}/profile.jpg`);
  try {
    const url = await getDownloadURL(pathReference);
    return url;
  } catch (e) {
    console.log(e);
  }
};
