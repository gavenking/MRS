// firebase/index.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBZecYcJM8y1hoxlhKOWB_EqaOll4o7tiQ",
  authDomain: "theapp-b1af6.firebaseapp.com",
  projectId: "theapp-b1af6",
  storageBucket: "theapp-b1af6.appspot.com",
  messagingSenderId: "940657776835",
  appId: "1:940657776835:web:3123c6ee23f8bc9954aa76",
};

// ✅ Hermes-safe Firebase singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
