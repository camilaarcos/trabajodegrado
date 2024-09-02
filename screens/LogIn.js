import { BlurView } from 'expo-blur';
import { StyleSheet, Text, TouchableOpacity,ScrollView, TextInput, View, Alert, Image } from 'react-native';
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { useNavigation } from '@react-navigation/native';

export default function LogIn({setIsLoggedIn}) {
  const navigation = useNavigation();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);


  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Usuario logueado');
      const user = userCredential.user;
      console.log(user);
      Alert.alert("Inicio de sesión", "Inicio correctamente");
      setIsLoggedIn(true);
      navigation.navigate('MyTabs');
    })
    .catch((error) => {
      console.log(error);
      Alert.alert(error.message);
    });
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
              <TextInput onChangeText={(text)=> setEmail(text)} style={styles.input} placeholder='ejemplo@gmail.com'/>
              <Text style={styles.email}>Contraseña</Text>
              <TextInput onChangeText={(text)=> setPassword(text)} style={styles.input} placeholder='contraseña' secureTextEntry= {true} />
              <TouchableOpacity onPress={handleSignIn} style={styles.boxbutton}>
              <Text style={styles.login}>Iniciar sesión</Text>
              </TouchableOpacity>

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
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.registerLink}>Recuperar</Text>
              </TouchableOpacity>
              
              </View>

            </View>
          </BlurView>
          {/* <Image source={require('../assets/logo.png')} style={styles.imageStyle} /> */}
        </ScrollView>
      
    </View>
  );
}

  const styles = StyleSheet.create({
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
      width: 100, // Ancho de la imagen
      height: 100, // Altura de la imagen
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
      // borderRadius: 50,
      marginBottom: 10,
    },
    email: {
      fontSize: 17,
      color: '#4d82bc',
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
      color: "#4d82bc",
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
      color: "#4d82bc", 
      fontWeight: 'bold',
      textDecorationLine: "underline",
    },
    forgotPasswordContainer: {
      flexDirection: 'row',
      marginTop: 10, // Espacio entre el texto de registro y el texto de olvidar contraseña
      alignItems: 'center',
    },
    blurContainer: {
      marginTop: 20, // Espacio entre el contenedor de inicio de sesión y el contenedor de registro
      marginVertical: 5, // Espacio vertical entre los contenedores
      padding: 5, // Espacio interno del contenedor
      paddingBottom: 10, // Espacio en la parte inferior del contenedor
      borderRadius: 10, // Bordes redondeados
      overflow: 'hidden', // Oculta el contenido que se sale del contenedor
    },
  });