import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity,ScrollView, TextInput, View, Image } from 'react-native';
import React, { useState} from "react";
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../src/config/firebase';
import { useNavigation } from '@react-navigation/native';
import {collection, setDoc, doc} from 'firebase/firestore';
import CustomAlert from '../src/componentes/Alertas';
import { validateEmail } from '../utils/Ayudas';
import { styles } from './LogIn';
export default function SignIn() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertIcon, setAlertIcon] = useState(null);
  const [siginSuccess, setsiginSuccess] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleCreateAccount = async() => {
    if (!validateEmail(email)) {
      setAlertMessage('Correo electrónico inválido');
      setAlertIcon(require('../assets/alert.png'));
      setAlertVisible(true);
      return;
    }
    if (password !== confirmPassword) {
      setAlertMessage('Las contraseñas no coinciden');
      setAlertIcon(require('../assets/alert.png'));
      setAlertVisible(true);
      return;
    }
    if (confirmPassword.length < 6) {
      setAlertMessage('La contraseña debe tener al menos 6 carácteres');
      setAlertIcon(require('../assets/alert.png'));
      setAlertVisible(true);
      return;  
    }
    try {
      console.log('Usuario creado');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      setAlertMessage('Usuario registrado correctamente');
      setAlertIcon(require('../assets/success.png'));
      setAlertVisible(true);
      setsiginSuccess(true);
      const userDocRef = doc(FIREBASE_DB, 'usuarios', user.uid);
      await setDoc(userDocRef, { uid: user.uid, nombre:name, correo: email, rol: 'Usuario' });
    } catch (error) {
      console.log(error);
      setAlertMessage('Error al registrar el usuario');
      setAlertIcon(require('../assets/error.png'));
      setAlertVisible(true);
      setsiginSuccess(false);
    }
     
  }

  const handleCloseAlert = () => {
    setAlertVisible(false);
    if(siginSuccess){
      navigation.navigate('Inicio de sesión');
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 30,
      }}>
        
          
          <View style={styles.login1}>
            <StatusBar style="auto" />
            <Text style={styles.tittle}>Registro de usuario</Text>
            <Image source={require('../assets/I1.png')} style={styles.avatar} />

            <View style={styles2.inputContainer}>
            <Text style={styles.email}>Nombre</Text>
              <TextInput onChangeText={(text)=> setName(text)} style={styles.input} placeholder='Nombre'/>
              <Text style={styles.email}>Correo electrónico</Text>
              <TextInput onChangeText={(text)=> setEmail(text)} style={styles.input} placeholder='ejemplo@gmail.com' keyboardType='email-address'/>
              <Text style={styles.email}>Contraseña</Text>
              <TextInput onChangeText={(text)=> setPassword(text)} style={styles.input} placeholder='Contraseña' secureTextEntry= {true} />
              <Text style={styles.email}>Confirmar Contraseña</Text>
              <TextInput onChangeText={(text) => setConfirmPassword(text)} style={styles.input} placeholder='Confirmar contraseña' secureTextEntry={true} />
              <TouchableOpacity onPress={handleCreateAccount}  style={styles.boxbutton}>
              <Text style={styles.login}>Registrate</Text>
              </TouchableOpacity>
              <CustomAlert
                visible={alertVisible}
                title="Registro de Usuario"
                icon={alertIcon}
                message={alertMessage}
                onClose={handleCloseAlert}
              />
              <View style={styles2.registerContainer2}>
              <Text style={styles.registerText}>¿Ya tienes cuenta?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Inicio de sesión')}
              >
                <Text style={styles.registerLink}>Inicia sesión</Text>
              </TouchableOpacity>
              </View>
              </View>
              
            </View>
        </ScrollView>
      
    </View>
  );
}

const styles2 = StyleSheet.create({
  
  registerContainer2: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    gap: 5,
    width: 267, 
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 16,
    width: 277,
    height: 395,
    marginTop: 50,
  },
});