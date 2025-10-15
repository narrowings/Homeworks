// /src/firebase/providers.js
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./config";
import { signOut } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const logoutFirebase = async () => {
  return await signOut(auth);
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    return {
      ok: true,
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};
