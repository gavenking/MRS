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
      try {
        // Set up persistent Auth instance dynamically
        const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
        const AsyncStorage = AsyncStorageModule.default;
        const authModule = await import('firebase/auth');
        const { initializeAuth, getReactNativePersistence, onAuthStateChanged } = authModule;

        const auth = initializeAuth(app, {
          persistence: getReactNativePersistence(AsyncStorage)
        });

        unsubscribe = onAuthStateChanged(auth, (usr) => {
          setUser(usr);
          setLoading(false);
        });
      } catch (err) {
        console.error('Auth init error', err);
        setLoading(false);
      }
    })();

    return () => unsubscribe && unsubscribe();
  }, []);

  const login = async (email, pass) => {
    const authModule = await import('firebase/auth');
    const auth = authModule.getAuth(app);
    return authModule.signInWithEmailAndPassword(auth, email, pass);
  };

  const signUp = async (email, pass) => {
    const authModule = await import('firebase/auth');
    const auth = authModule.getAuth(app);
    return authModule.createUserWithEmailAndPassword(auth, email, pass);
  };

  const logout = async () => {
    const authModule = await import('firebase/auth');
    const auth = authModule.getAuth(app);
    return authModule.signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
