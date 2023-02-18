import { getApp, getApps, initializeApp } from "firebase/app";
import firebaseConfig from "./firebase-config";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

function getUserRef(email: string) {
  return collection(db, `users/${email}`);
}

function getChatRef(email: string) {
  return collection(db, `users/${email}/chats`);
}

async function addChat(email: string) {
  const doc = await addDoc(getChatRef(email), {
    userId: email,
    createdAt: serverTimestamp(),
  });

  return doc;
}

export default db;
export { addChat, getChatRef };
