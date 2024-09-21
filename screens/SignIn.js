import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity,ScrollView, TextInput, View, Image } from 'react-native';
import React, { useState} from "react";
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../src/config/firebase';
import { useNavigation } from '@react-navigation/native';
import {collection, addDoc} from 'firebase/firestore';
import CustomAlert from '../src/componentes/Alertas';
import { validateEmail } from '../utils/Ayudas';
export default function SignIn() {
  const navigation = useNavigation();
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
      const userCollectionRef = collection(FIREBASE_DB, 'usuarios');
      await addDoc(userCollectionRef, { uid: user.uid, correo: email, rol: 'usuario' });
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
              <CustomAlert
                visible={alertVisible}
                title="Registro de Usuario"
                icon={alertIcon}
                message={alertMessage}
                onClose={handleCloseAlert}
              />
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
    color: '#000',
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
    marginTop: 10,
  },
  registerText: {
    marginRight: 5,
  },
  registerLink: {
    color: "#000",
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