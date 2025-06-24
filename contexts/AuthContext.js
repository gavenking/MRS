// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import app from '../firebaseConfig';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    (async () => {
      // Provide AsyncStorage for persistent auth state
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      const authModule   = require('firebase/auth');
      const { initializeAuth, getReactNativePersistence, onAuthStateChanged } = authModule;

      // Initialize Auth with React Native persistence
      const auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
      });

      // Subscribe to auth state
      unsubscribe = onAuthStateChanged(auth, (usr) => {
        setUser(usr);
        setLoading(false);
      });
    })();

    return () => unsubscribe && unsubscribe();
  }, []);

  const login = async (email, pass) => {
    const authModule = require('firebase/auth');
    const auth       = authModule.getAuth(app);
    return authModule.signInWithEmailAndPassword(auth, email, pass);
  };

  const signUp = async (email, pass) => {
    const authModule = require('firebase/auth');
    const auth       = authModule.getAuth(app);
    return authModule.createUserWithEmailAndPassword(auth, email, pass);
  };

  const logout = async () => {
    const authModule = require('firebase/auth');
    const auth       = authModule.getAuth(app);
    return authModule.signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
