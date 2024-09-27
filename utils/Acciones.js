import { FIREBASE_AUTH, FIREBASE_DB } from '../src/config/firebase';
import "firebase/auth";
import {getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword, sendPasswordResetEmail
  } from 'firebase/auth';
  import { collection, doc, onSnapshot, orderBy, query, QuerySnapshot, getDoc } from "firebase/firestore";

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

  export const fetchUserData = async (uid) => {
    const result = { statusResponse: true, data: null, error: null };
    const auth = FIREBASE_AUTH;
    const user = auth.currentUser;
    try {
        const userDocRef = doc(FIREBASE_DB, 'usuarios', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            result.data = {
                id: uid,
                rol: userData.rol,
                nombre: userData.nombre,
                correo: userData.correo
            };
        } else {
            result.statusResponse = false;
        }
    } catch (error) {
        result.statusResponse = false;
        result.error = error.message;
    }
    return result;
};

export const fetchCrimenes = (callback) => {
    const collectionRef = collection(FIREBASE_DB, 'crimenes');
    const q = query(collectionRef, orderBy('Fecha', 'asc'));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const crimenes = querySnapshot.docs.map(doc => {
        const data = doc.data();
          let fechaString = '';
            if (data && data.Fecha) {
              const fechaDate = new Date(data.Fecha.seconds * 1000);
              fechaString = fechaDate.toLocaleDateString();
            }
            return {
              id: doc.id,
              Tipo: data.Tipo,
              Fecha: fechaString,
              Barrio: data.Barrio,
              Direccion: data.Direccion,
              Observacion: data.Observacion,
            };
      });
      callback({ statusResponse: true, data: crimenes });
    }, (error) => {
      callback({ statusResponse: false, error: error.message });
    });
  
    return unsubscribe;
};

export const fetchUsuarios = (callback) => {
  const collectionRef = collection(FIREBASE_DB, 'usuarios');
  const q = query(collectionRef);

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const usuarios = querySnapshot.docs.map(doc => {
      const data = doc.data();
          return {
            id: doc.id,
            uid: data.uid,
            nombre: data.nombre,
            correo: data.correo,
            rol: data.rol,
          };
    });
    callback({ statusResponse: true, data: usuarios });
  }, (error) => {
    callback({ statusResponse: false, error: error.message });
  });

  return unsubscribe;
};




