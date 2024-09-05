import { FIREBASE_AUTH } from "../firebase-config";
import firebase from "firebase/app";
import "firebase/auth";
import {
    sendPasswordResetEmail
  } from 'firebase/auth';


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