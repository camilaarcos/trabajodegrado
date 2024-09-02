import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FIREBASE_AUTH } from '../firebase-config';
import { useNavigation } from '@react-navigation/native';
const RecoverPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleRecoverPassword = async () => {
    try {
    await FIREBASE_AUTH.sendPasswordResetEmail(email);
      Alert.alert('Éxito', 'Correo de recuperación enviado');
      navigation.navigate('LogIn');
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar el correo de recuperación');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={setEmail}
        value={email}
      />
      <TouchableOpacity onPress={handleRecoverPassword} style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
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

export default RecoverPassword;