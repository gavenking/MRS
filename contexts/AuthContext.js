// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import app from '../firebaseConfig';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use require() so Hermes doesn't choke and to avoid async pitfalls
    try {
      const authModule = require('firebase/auth');
      const auth = authModule.getAuth(app);
      const unsubscribe = authModule.onAuthStateChanged(auth, (usr) => {
        setUser(usr);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (err) {
      console.error('Auth setup failed', err);
      // clear loader so UI can render (user will be null)
      setLoading(false);
    }
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
