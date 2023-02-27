import { getApp, getApps, initializeApp } from "firebase/app";
import firebaseConfig from "./firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
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
function getChatDocRef(email: string, id: string) {
  return doc(db, `users/${email}/chats/${id}`);
}

function getMessageRef(email: string, id: string) {
  return collection(db, `users/${email}/chats/${id}/messages`);
}

async function addChat(email: string) {
  const doc = await addDoc(getChatRef(email), {
    userId: email,
    createdAt: serverTimestamp(),
  });

  return doc;
}

async function removeChatDoc(email: string, id: string) {
  await deleteDoc(getChatDocRef(email, id));
}

export default db;
export { addChat, getChatRef, getMessageRef, removeChatDoc };
