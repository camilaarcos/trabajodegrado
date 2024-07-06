import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity,ScrollView, TextInput, View, Alert } from 'react-native';
import React, { Component, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { useNavigation } from '@react-navigation/native';

export default function LogIn() {
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
      Alert.alert("Título del Aviso", "Mensaje del aviso.");
      navigation.navigate('Inicio');
    })
    .catch((error) => {
      console.log(error);
    });
  } 
  const handleLogIn = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    try {
      await LogIn(email, password);
      alert("Se inició sesión");
    } catch (error) {
      alert("Error al iniciar sesión " + error.message);
    } 
  };
  return (
    <View style={styles.container}>
      
      <ScrollView contentContainerStyle={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <BlurView intensity={100} >   
          <View style={styles.login1}>
              <Text style={styles.email}>Email</Text>
              <TextInput onChangeText={(text)=> setEmail(text)} style={styles.input} placeholder='email@email.com'/>
              <Text style={styles.email}>Contraseña</Text>
              <TextInput onChangeText={(text)=> setPassword(text)} style={styles.input} placeholder='contraseña' secureTextEntry= {true} />
              <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.login}>Inicio Sesión</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignIn')}
              >
                <Text style={styles.registerLink}> Regístrate</Text>
              </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </ScrollView>
      
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    login1: {
      width: 350,
      height: 500,
      borderColor: 'blue',
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
    },
    email: {
      fontSize: 17,
      fontWeight: '400'
    },
    input: {
      width: 250,
      height: 40,
      borderColor: '#000',
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      backgroundColor: '#00000090',
      marginBottom: 20,
    },
    login: {
      color: "#525fe1",
    },
   boxbutton: {
      backgroundColor: "#525fe1",
      padding: 10,
      borderRadius: 5,
      margin: 10,
    },
    registerContainer: {
      flexDirection: "row", 
      alignItems: "center", 
      justifyContent: "center", 
      marginTop: 10, 
    },
    registerText: {
      marginRight: 5, 
    },
    registerLink: {
      color: "#525fe1", 
    },
  });