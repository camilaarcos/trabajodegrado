import { BlurView } from 'expo-blur';
import { StyleSheet, Text, TouchableOpacity,ScrollView, TextInput, View, Image } from 'react-native';
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../src/config/firebase'; 
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../src/componentes/Alertas';
export default function LogIn({setIsLoggedIn}) {
  const navigation = useNavigation();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertIcon, setAlertIcon] = useState(null);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const auth = FIREBASE_AUTH;


  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Usuario logueado');
      const user = userCredential.user;
      console.log(user);
      setAlertMessage("Inició correctamente");
      setAlertIcon(require('../assets/success.png')); 
      setAlertVisible(true);
      setIsLoginSuccessful(true);
    })
    .catch((error) => {
      console.log(error);
      setAlertMessage("Error al iniciar sesión, verifica información");
      setAlertIcon(require('../assets/error.png')); 
      setAlertVisible(true);
      setIsLoginSuccessful(false);
    });
  } 
  const handleCloseAlert = () => {
    setAlertVisible(false);
    if (isLoginSuccessful) {
      setIsLoggedIn(true);
      navigation.navigate('MyTabs');
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/fondo.png')} style={[styles.imagefondo, StyleSheet.absoluteFill]} />
      
      <ScrollView contentContainerStyle={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 90,
      }}>
        
        <BlurView intensity={100} style={styles.blurPrincipal}>   
          <View style={styles.login1}>
          <Text style={styles.tittle}>Inicio de sesión</Text>
          <Image source={require('../assets/Password-Security.png')} style={styles.avatar} />
              <Text style={styles.email}>Correo electrónico</Text>
              <TextInput onChangeText={(text)=> setEmail(text)} style={styles.input} placeholder='ejemplo@gmail.com' keyboardType='email-address'/>
              <Text style={styles.email}>Contraseña</Text>
              <TextInput onChangeText={(text)=> setPassword(text)} style={styles.input} placeholder='contraseña' secureTextEntry= {true} keyboardType='numbers-and-punctuation'/>
              <TouchableOpacity onPress={handleSignIn} style={styles.boxbutton}>
              <Text style={styles.login}>Iniciar sesión</Text>
              </TouchableOpacity>
              <CustomAlert
                visible={alertVisible}
                title="Sesión"
                message={alertMessage}
                icon={alertIcon}
                onClose={handleCloseAlert}
              />
              <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Registrarse')} 
              >
                <Text style={styles.registerLink}>Regístrate</Text>
              </TouchableOpacity>
              </View>
              <View style={styles.forgotPasswordContainer}>
              <Text style={styles.registerText}>¿Olvidaste tu contraseña?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('RecoverPassword')}>
                <Text style={styles.registerLink}>Recuperar</Text>
              </TouchableOpacity>
              
              </View>

            </View>
          </BlurView>
        </ScrollView>
      
    </View>
  );
}

 export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    blurPrincipal: {
      height: '80%',
      borderRadius: 10,
      overflow: 'hidden',
    },
    imagefondo: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    tittle: {
      fontSize: 30,
      color: '#4d82bc',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    imageStyle: {
      width: 100, 
      height: 100, 
      marginTop: 20,
      alignSelf: 'flex-end',
    },
    login1: {
      width: 350,
      height: '100%',
      borderColor: '#4d82bc',
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
    },
    avatar: {
      width: 100,
      height: 100,
      marginBottom: 10,
    },
    email: {
      fontSize: 17,
      color: '#000',
      fontWeight: 'bold',
    },
    input: {
      width: 250,
      height: 40,
      borderColor: '#fff',
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      backgroundColor: '#ffffff90',
      marginBottom: 20,
      fontWeight: '400',
    },
    login: {
      color: "#000",
      fontWeight: 'bold',

    },
   boxbutton: {
    backgroundColor: "#ffffff80",
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
    margin: 10,
    },
    registerContainer: {
      flexDirection: "row", 
      alignItems: "center", 
      justifyContent: "center", 
      marginTop: 20, 
    },
    registerText: {
      marginRight: 5, 
    },
    registerLink: {
      color: "#000", 
      fontWeight: 'bold',
      textDecorationLine: "underline",
    },
    forgotPasswordContainer: {
      flexDirection: 'row',
      marginTop: 10, 
      alignItems: 'center',
    },
    blurContainer: {
      marginTop: 20,
      marginVertical: 5, 
      padding: 5, 
      paddingBottom: 10, 
      borderRadius: 10, 
      overflow: 'hidden', 
    },
  });