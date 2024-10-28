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
      
      <ScrollView contentContainerStyle={{
        flex: 1,
        flexDirection: 'column',
        width: 368,
        height: 815,
        alignItems: 'center',
      }}>
        
          <View style={styles.login1}>
            <View style = {styles.titulo}>
            <Text style={styles.tittle}>Inicio de sesión</Text>
            </View>
          
          <Image source={require('../assets/I1.png')} style={styles.avatar} />
          <View style = {styles.ContainerCentral}>
              <Text style={styles.email}>Correo Electrónico</Text>
              <TextInput onChangeText={(text)=> setEmail(text)} style={styles.input} placeholder='ejemplo@gmail.com' keyboardType='email-address'/>
              <Text style={styles.email}>Contraseña</Text>
              <TextInput onChangeText={(text)=> setPassword(text)} style={styles.input} placeholder='contraseña' secureTextEntry= {true} keyboardType='numbers-and-punctuation'/>
              <TouchableOpacity onPress={handleSignIn} style={styles.boxbutton}>
              <Text style={styles.login}>Inicia sesión</Text>
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
                <Text style={styles.registerLink}>Recuperala</Text>
              </TouchableOpacity>
              
              </View>
          </View>    
              

            </View>
          {/* </BlurView> */}
        </ScrollView>
      
    </View>
  );
}

 export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#FEFEFE',
    },
    titulo: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      width: 368,
      height: 60,
      marginTop: 30,
    },

    tittle: {
      fontSize: 40,
      color: '#2E3A47',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    login1: {
      flexDirection: 'column',
      // justifyContent: 'center',
      alignItems: 'center',
      // gap: 15,
      width: 368,
      height: 815,
      // backgroundColor: '#000',
    },
    avatar: {
      width: 100,
      height: 100,
    },
    ContainerCentral: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: 15,
      width: 277,
      height: 395,
      marginTop: 50,
    },
    email: {
      fontSize: 12,
      color: '#2E3A47',
      fontWeight: 'bold',
    },
    input: {
      width: 277,
      height: 44,
      borderColor: '#00AFFF',
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      backgroundColor: '#80808035',
      fontWeight: '400',
    },
    login: {
      color: "#FFFFFF",
      fontWeight: 'bold',
      fontSize: 14,
    },
   boxbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#50AB89",
    padding: 10,
    gap: 10,
    borderRadius: 10,
    width: 277,
    height: 44,
    marginTop: 30,
    },
    registerContainer: {
      flexDirection: "row", 
      alignItems: "center", 
      justifyContent: "center", 
      marginTop: 50, 
      gap: 5,
      width: 267,
    },
    registerText: {
      // marginRight: 5, 
      color: "#2E3A47",
      fontSize: 14,
      fontWeight: 'bold',
    },
    registerLink: {
      color: "#00AFFF", 
      fontWeight: 'bold',
    },
    forgotPasswordContainer: {
      flexDirection: "row", 
      alignItems: "center", 
      justifyContent: "center", 
      width: 267,
      gap: 5,
    },
  });