import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9bCTjkaoJxetxYiYaR2pStu39vrOfi7s",
  authDomain: "hackathon-c6810.firebaseapp.com",
  projectId: "hackathon-c6810",
  storageBucket: "hackathon-c6810.appspot.com",
  messagingSenderId: "27671574106",
  appId: "1:27671574106:web:aac1c46003d7f985814a63",
  measurementId: "G-1Y91EGVDDL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
