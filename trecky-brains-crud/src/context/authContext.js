import { createContext, useContext } from "react";
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  onAuthStateChanged, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
}

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);

  const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log({ currentUser });
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  return (
    <authContext.Provider value={{
      signup,
      login,
      user,
      logout,
      loading,
      resetPassword,
    }}>
      {children}
    </authContext.Provider>
  );
}