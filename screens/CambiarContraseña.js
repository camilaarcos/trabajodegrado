import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { actualizaContraseña, reauthenticate } from '../utils/Acciones';
import { isEmpty, size } from 'lodash'
import CustomAlert from '../src/componentes/Alertas';

export default function CambiarContraseña  () {
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorNewPassword, setErrorNewPassword] = useState('');
    const [errorCurrentPassword, setErrorCurrentPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertIcon, setAlertIcon] = useState(null);
  const navigation = useNavigation();


  const onSubmit = async() => {
    if (!validateForm()) {
        return
    }

    const resultReauthenticate = await reauthenticate(currentPassword)
    if (!resultReauthenticate.statusResponse) {
        setAlertMessage("Contraseña incorrecta.");
        setAlertIcon(require('../assets/error.png'));
        setAlertVisible(true);
        return
    }
    const resultUpdatePassword = await actualizaContraseña(newPassword)

    if (!resultUpdatePassword.statusResponse) {
        setAlertMessage("Hubo un problema cambiando la contraseña, por favor intente más tarde.");
        setAlertIcon(require('../assets/error.png'));
        setAlertVisible(true);
        return
    }

    setAlertMessage("Se ha actualizado la contraseña correctamente.");
    setAlertIcon(require('../assets/success.png'));
    setAlertVisible(true);
    navigation.navigate('Perfil');
}
const validateForm = () => {
    let isValid = true;

    if(isEmpty(currentPassword)) {
        setAlertMessage('Debes ingresar tu contraseña actual.');
        setAlertIcon(require('../assets/error.png'));
        setAlertVisible(true);
        isValid = false;
    }

    if(size(confirmPassword) < 6 && size(newPassword) < 6) {
        setAlertMessage('Debes ingresar una nueva contraseña de al menos 6 carácteres.');
        setAlertIcon(require('../assets/alert.png'));
        setAlertVisible(true);
        isValid = false;
    }

    if(newPassword !== confirmPassword) {
        setAlertMessage('La nueva contraseña y la confirmación no son iguales.');
        setAlertIcon(require('../assets/error.png'));
        setAlertVisible(true);
        isValid = false;
    }

    if(newPassword === currentPassword) {
        setAlertMessage('Debes ingresar una contraseña diferente a la actual.');
        setAlertIcon(require('../assets/error.png'));
        setAlertVisible(true);
        isValid = false;
    }

    return isValid;
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
                <Text style={styles.tittle}>Cambiar Contraseña</Text>
                  <Image source={require('../assets/Security.png')} style={styles.avatar} />
                    <TextInput
                      style={styles.input}
                      placeholder="Contraseña actual"
                      onChangeText={setCurrentPassword}
                      value={currentPassword}
                      errorMessage={errorCurrentPassword}
                      password={true}
                      secureTextEntry={!showPassword}
                    />
                      <TextInput
                        style={styles.input}
                        placeholder="Contraseña Nueva"
                        onChangeText={setNewPassword}
                        value={newPassword}
                        errorMessage={errorNewPassword}
                        password={true}
                        secureTextEntry={!showPassword}
                      />
                        <TextInput
                          style={styles.input}
                          placeholder="Confirmar Contraseña Nueva"
                          onChangeText={setConfirmPassword}
                          value={confirmPassword}
                          errorMessage={errorConfirmPassword}
                          password={true}
                          secureTextEntry={!showPassword}
                        />
                          <TouchableOpacity onPress={onSubmit} style={styles.button}>
                            <Text style={styles.buttonText}>Cambiar Contraseña</Text>
                          </TouchableOpacity>
                            <CustomAlert
                              visible={alertVisible}
                              title="Cambiar Contraseña"
                              message={alertMessage}
                              icon={alertIcon}
                              onClose={() => setAlertVisible(false)}
                            />
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
    color: "#000",
      fontWeight: 'bold',
  },
  
});

