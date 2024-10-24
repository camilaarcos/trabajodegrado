import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { validateEmail } from '../utils/Ayudas';
import { passwordReset } from '../utils/Acciones';
import CustomAlert from '../src/componentes/Alertas';
import { styles } from './LogIn';
export default function RecoverPassword  () {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertIcon, setAlertIcon] = useState(null);
  const [RecuperarSuccess, setRecuperarSuccess] = useState(false);

  const validateData = () => {
    setErrorEmail('');
    let valid = true;

    if(!validateEmail(email)){
      setErrorEmail('Correo electrónico inválido');
      setAlertMessage('Correo electrónico inválido');
      setAlertIcon(require('../assets/alert.png'));
      setAlertVisible(true);
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
      setAlertMessage('Error, intentado más tarde.');
      setAlertIcon(require('../assets/error.png'));
      setAlertVisible(true);
      return;
    }
    setAlertMessage('Revise su bandeja de entrada para cambiar su contraseña');
    setAlertIcon(require('../assets/success.png'));
    setAlertVisible(true);
    setRecuperarSuccess(true);
   
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
    if(RecuperarSuccess){
      navigation.navigate('Inicio de sesión');
    }
  };

 

  return (
    <View style={styles.container}>
      
      <ScrollView contentContainerStyle={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 90,
      }}>
        
        <BlurView intensity={100} style={styles2.blurPrincipal}>   
      <View style={styles.login1}>
      <Text style={[styles.tittle, styles2.tittle]}>Recuperar Contraseña</Text>
      {/* <Image source={require('../assets/Security.png')} style={styles.avatar} /> */}
      <Text>Ingresa el correo electrónico asociado</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={setEmail}
        value={email}
        errorMessage={errorEmail}
        keyboardType='email-address'

      />
      <TouchableOpacity onPress={handleRecoverPassword} style={styles.boxbutton}>
        <Text style={styles.login}>Recuperar Contraseña</Text>
      </TouchableOpacity>
      <CustomAlert
      visible={alertVisible}
      title="Recuperar Contraseña"
      message={alertMessage}
      icon={alertIcon}
      onClose={handleCloseAlert}
    />
      </View>
      </BlurView>
        </ScrollView>
    </View>
  );
};

const styles2 = StyleSheet.create({
  blurPrincipal: {
    marginTop: 20,
    height: '70%',
      borderRadius: 10,
      overflow: 'hidden',
  },
  tittle: {
    marginTop: 30,
  },

});
