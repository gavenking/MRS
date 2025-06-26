// firebaseConfig/firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore }  from 'firebase/firestore';
import { getAuth }       from 'firebase/auth';

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZecYcJM8y1hoxlhKOWB_EqaOll4o7tiQ",
  authDomain: "theapp-b1af6.firebaseapp.com",
  projectId: "theapp-b1af6",
  storageBucket: "theapp-b1af6.appspot.com",
  messagingSenderId: "940657776835",
  appId: "1:940657776835:web:3123c6ee23f8bc9954aa76",
};

// Initialize (or reuse) the Firebase App
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

// Create the services you need
const db   = getFirestore(app);
const auth = getAuth(app);

// Export them by name:
export { app, db, auth };
