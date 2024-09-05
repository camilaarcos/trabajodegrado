import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { validateEmail } from '../utils/Ayudas';
import { passwordReset } from '../utils/Acciones';


export default function RecoverPassword  () {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const navigation = useNavigation();


  const validateData = () => {
    setErrorEmail('');
    let valid = true;

    if(!validateEmail(email)){
      setErrorEmail('Correo electrónico inválido');
      valid = false;
    }
    return valid;
  };

  
  const handleRecoverPassword = async () => {
    if(!validateData()){
      return;
    }
    const result = await passwordReset(email);

    if(!result.statusResponse){
      Alert.alert('Error', result.error || 'Este correo electrónico no está registrado');
      return;
    }
    Alert.alert('Correo enviado', 'Revise su bandeja de entrada para cambiar su contraseña');
    navigation.navigate('Inicio de sesión');
  };

 

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
      <Text style={styles.tittle}>Recuperar Contraseña</Text>
      <Image source={require('../assets/Security.png')} style={styles.avatar} />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={setEmail}
        value={email}
        errorMessage={errorEmail}
        keyboardType='email-address'

      />
      <TouchableOpacity onPress={handleRecoverPassword} style={styles.button}>
        <Text style={styles.buttonText}>Recuperar Contraseña</Text>
      </TouchableOpacity>
      </View>
      </BlurView>
        </ScrollView>
    </View>
  );
};

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
  login1: {
    width: 350,
    height: '100%',
    borderColor: '#4d82bc',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  tittle: {
    marginTop: 60,
    fontSize: 20,
    color: '#4d82bc',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    // borderRadius: 50,
    marginBottom: 10,
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
    alignSelf: 'center',
  },
  button: {
    backgroundColor: "#ffffff80",
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
    margin: 10,
  },
  buttonText: {
    color: "#4d82bc",
      fontWeight: 'bold',
  },
  
});

