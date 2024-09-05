import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
      <Text style={styles.title}>Recuperar Contraseña</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

