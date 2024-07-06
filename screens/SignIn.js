import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity,ScrollView, TextInput, View, Alert } from 'react-native';
import React, { Component, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
  const navigation = useNavigation();
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
            <Text>Registro</Text>
            <StatusBar style="auto" />
              <Text style={styles.email}>Email</Text>
              <TextInput onChangeText={(text)=> setEmail(text)} style={styles.input} placeholder='email@email.com'/>
              <Text style={styles.email}>Contraseña</Text>
              <TextInput onChangeText={(text)=> setPassword(text)} style={styles.input} placeholder='contraseña' secureTextEntry= {true} />
              <TouchableOpacity onPress={handleCreateAccount}>
              <Text style={styles.login}>Registrarse</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿Ya tienes cuenta?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('LogIn')}
              >
                <Text style={styles.registerLink}> Inicia sesión</Text>
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