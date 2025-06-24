// firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZecYcJM8y1hoxlhKOWB_EqaOll4o7tiQ",
  authDomain: "theapp-b1af6.firebaseapp.com",
  projectId: "theapp-b1af6",
  storageBucket: "theapp-b1af6.appspot.com",
  messagingSenderId: "940657776835",
  appId: "1:940657776835:web:3123c6ee23f8bc9954aa76",
};

// Initialize or retrieve the existing app instance
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export default app;
