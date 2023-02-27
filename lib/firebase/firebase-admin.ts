import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";

const serviceAccount = require("../../service-account.json");

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const adminDb = admin.firestore();

export { adminDb };
