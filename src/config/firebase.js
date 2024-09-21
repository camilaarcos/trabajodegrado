
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDVI1okoTmQX_-dVduWpG2FI-v1N7e0Sgo",
  authDomain: "proyecto-3dd90.firebaseapp.com",
  projectId: "proyecto-3dd90",
  storageBucket: "proyecto-3dd90.appspot.com",
  messagingSenderId: "172339892413",
  appId: "1:172339892413:web:8a86a321838cc3b27267d4"
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const database = getFirestore(app);
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
} catch (e) {
  if (e.code === 'auth/already-initialized') {
    auth = getAuth(app);
  } else {
    throw e;
  }
}

export { app as FIREBASE_APP, auth as FIREBASE_AUTH, database as FIREBASE_DB };