// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import app from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamically require the Auth SDK under JSC to avoid Hermes/ESM parse issues
    const authModule = require('firebase/auth');
    const { initializeAuth, getReactNativePersistence, onAuthStateChanged } = authModule;

    // Initialize auth with AsyncStorage persistence
    const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email, pass) => {
    const authModule = require('firebase/auth');
    const auth = authModule.getAuth(app);
    return authModule.signInWithEmailAndPassword(auth, email, pass);
  };

  const signUp = (email, pass) => {
    const authModule = require('firebase/auth');
    const auth = authModule.getAuth(app);
    return authModule.createUserWithEmailAndPassword(auth, email, pass);
  };

  const logout = () => {
    const authModule = require('firebase/auth');
    const auth = authModule.getAuth(app);
    return authModule.signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
