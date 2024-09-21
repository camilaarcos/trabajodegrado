import { FIREBASE_AUTH } from '../src/config/firebase';
import "firebase/auth";
import {getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword, sendPasswordResetEmail
  } from 'firebase/auth';


  export const getCurrentUser = () => {
    const user = FIREBASE_AUTH.currentUser;
    return user;
}
  export const reauthenticate = async(password) => {
    const result = { statusResponse: true, error: null };
    const user = getCurrentUser();
    const credentials = EmailAuthProvider.credential(user.email, password);

    try {
        await reauthenticateWithCredential(user, credentials);
    } catch (error) {
        console.error("Error en la reautenticación:", error);
        result.statusResponse = false;
        result.error = error.message;
    }
    return result;     
}
export const actualizaContraseña = async(password) => {
    const result = { statusResponse: true, error: null };
    const user = getCurrentUser();

    try {
        await updatePassword(user, password);
    } catch (error) {
        result.statusResponse = false;
        result.error = error.message;
    }
    return result;     
}
export const passwordReset = async (email) => {
    const result = { statusResponse: true, error: null };
    try {
        await sendPasswordResetEmail(FIREBASE_AUTH, email)
    } catch (error) {
        result.statusResponse = false;
        result.error = error.message;
    }
    return result;
};