import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase/config";
import { register } from "./authSlice";
import { signInWithGoogle } from "./firebase/providers";
import { login } from "./authSlice";
import { logoutFirebase } from "./firebase/providers";
import { logout } from "./authSlice";

export const startGoogleLogin = () => {
  return async (dispatch) => {
    const result = await signInWithGoogle();
    if (!result.ok) return console.log("Error al iniciar con Google");
    dispatch(login(result)); // 👈 Guarda datos en Redux
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase(); // Cierra sesión en Firebase
    dispatch(logout());     // Limpia el estado en Redux
  };
};

export const registerAuth = (email, password) => {
    return async (dispatch) => {
        const response = await createUserWithEmailAndPassword(auth, email, password);

        if (response) {
            await updateProfile(auth.currentUser, {
                displayName: 'Rafa',
                photoURL: ''
            });

            const { uid, email, displayName, photoURL } = auth.currentUser;

            // ✅ EN VEZ DE register(...) usamos login(...)
            dispatch(login({ uid, email, displayName, photoURL }));
        } else {
            throw new Error('login failed');
        }
    }
};
