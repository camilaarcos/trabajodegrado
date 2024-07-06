import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity,ScrollView, TextInput, View, Alert } from 'react-native';
import React, { Component, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig, FIREBASE_AUTH } from './firebase-config';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/Home";
import LogIn from "./screens/LogIn";
import SignIn from './screens/SignIn';
import MyStack from './utils/MyStack';
import Home from './screens/Home';
import Inicio from './screens/Inicio';
function LoginScreen() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Usuario creado');
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
      Alert.alert(error.message);
    });
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Usuario logueado');
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
  } 
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
            <Text>Aloh!</Text>
            <StatusBar style="auto" />
            <TouchableOpacity style={styles.boxbutton} >
              <Text>Registrar Crímen</Text>
            </TouchableOpacity>
              <Text style={styles.email}>Email</Text>
              <TextInput onChangeText={(text)=> setEmail(text)} style={styles.input} placeholder='email@email.com'/>
              <Text style={styles.email}>Contraseña</Text>
              <TextInput onChangeText={(text)=> setPassword(text)} style={styles.input} placeholder='contraseña' secureTextEntry= {true} />
              <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.login}>Inicio Sesión</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreateAccount}>
              <Text style={styles.login}>Registrarse</Text>
              </TouchableOpacity> 
            </View>
          </BlurView>
        </ScrollView>
      
    </View>
  );
}
const Stack = createNativeStackNavigator();
export default function App() {

  return (
<NavigationContainer>
<Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Inicio" component={Inicio} />
      </Stack.Navigator>
      </NavigationContainer>
  );}

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
});
