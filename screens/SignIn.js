import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity,ScrollView, TextInput, View, Alert, Image } from 'react-native';
import React, { useState} from "react";
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Usuario creado');
      const user = userCredential.user;
      console.log(user);
      Alert.alert( "Usuario registrado correctamente");
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
        marginTop: 70,
      }}>
        
        <BlurView intensity={100} style={styles.BlurPrincipal}>
          
          <View style={styles.login1}>
            <StatusBar style="auto" />
            <Text style={styles.tittle}>Registro de usuario</Text>
            <Image source={require('../assets/Valid-Ids.png')} style={styles.avatar} />
              <Text style={styles.email}>Correo electrónico</Text>
              <TextInput onChangeText={(text)=> setEmail(text)} style={styles.input} placeholder='ejemplo@gmail.com' keyboardType='email-address'/>
              <Text style={styles.email}>Contraseña</Text>
              <TextInput onChangeText={(text)=> setPassword(text)} style={styles.input} placeholder='contraseña' secureTextEntry= {true} />
              <Text style={styles.email}>Confirmar Contraseña</Text>
              <TextInput onChangeText={(text) => setConfirmPassword(text)} style={styles.input} placeholder='confirmar contraseña' secureTextEntry={true} />
              <TouchableOpacity onPress={handleCreateAccount}  style={styles.boxbutton}>
              <Text style={styles.login}>Registrarse</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿Ya tienes cuenta?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Inicio de sesión')}
              >
                <Text style={styles.registerLink}>Inicia sesión</Text>
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
    alignItems: 'center',
  },
  BlurPrincipal: {
    height: '90%',
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
    marginBottom: 10,
  },
  email: {
    fontSize: 17,
    color: '#4d82bc',
    fontWeight: 'bold',
    marginTop: 10,
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
    marginTop: 10,
  },
  registerText: {
    marginRight: 5,
  },
  registerLink: {
    color: "#4d82bc",
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  blurContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    borderRadius: 5, // Bordes redondeados
    overflow: 'hidden', // Oculta el contenido que se sale del contenedor
    marginTop: 20,
  },
});