import { firebaseConfig } from "@/services/firebase";

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useRef } from "react";

// a hook called useFirebase that initializes an instance of the firebase for the lifetime of the app and returnes it as a value:
export function useFirebase() {
  const app = useRef(initializeApp(firebaseConfig));
  const auth = useRef(getAuth(app.current));
  const firestore = useRef(getFirestore(app.current));

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth.current, provider);
      const user = result.user;
      console.log(user);
      // Handle successful sign-in
    } catch (error) {
      console.error(error);
      // Handle sign-in error
    }
  };

  return {
    app: app.current,
    auth: auth.current,
    signInWithGoogle,
    firestore: firestore.current,
  };
}
