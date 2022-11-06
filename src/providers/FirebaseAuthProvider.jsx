import React, {
  useMemo,
  useEffect,
  createContext,
  useState,
  useContext,
  useCallback
} from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { firebaseApp } from "../libs/firebase";

const FirebaseAuthContext = createContext({});

const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const auth = useMemo(() => {
    return getAuth(firebaseApp);
  }, []);

  const signIn = useCallback(
    ({ email, password }) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => console.log(user))
        .catch((error) => {
          console.log(error.code);
          if (error.code === "auth/wrong-password") {
            setError("Please check the Password");
          }
          if (error.code === "auth/user-not-found") {
            setError("Please check the Email");
          }
        });
    },
    [auth]
  );

  const logoutOut = useCallback(() => {
    signOut(auth);
  }, [auth]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, [auth]);

  const value = { user, signIn, logoutOut, error };

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};
const useAuth = () => useContext(FirebaseAuthContext);
export { FirebaseAuthProvider, useAuth };
