import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!getApps().length) {
  if (!projectId || !clientEmail || !privateKey) {
    console.warn(
      "Firebase Admin not configured — set FIREBASE_PROJECT_ID, " +
        "FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in backend/.env " +
        "for Google sign-in to work.",
    );
  } else {
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  }
}

export const adminAuth = getAuth();