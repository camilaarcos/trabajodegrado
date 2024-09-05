// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,initializeAuth,getReactNativePersistence  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDVI1okoTmQX_-dVduWpG2FI-v1N7e0Sgo",
  authDomain: "proyecto-3dd90.firebaseapp.com",
  projectId: "proyecto-3dd90",
  storageBucket: "proyecto-3dd90.appspot.com",
  messagingSenderId: "172339892413",
  appId: "1:172339892413:web:8a86a321838cc3b27267d4"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);