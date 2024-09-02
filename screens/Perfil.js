import {Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as React from 'react';
import { FIREBASE_AUTH } from "../firebase-config";
import { useNavigation } from '@react-navigation/native';


export default function Perfil() {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
          await FIREBASE_AUTH.signOut();
          console.log('Cerrando sesión...');
          navigation.navigate('Home'); // Navega a la pantalla de inicio de sesión
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      };

return(
    <View style={styles.container}>
        <Image source={require('../assets/fondo.png')} style={[styles.imagefondo, StyleSheet.absoluteFill]} />
        <Text style={styles.tittle}>Holis</Text>
        <Image source={require('../assets/Otp.png')} style={styles.imageStyle} />
        <View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.registerLink}> Cerrar sesión</Text>
        </TouchableOpacity>
    </View>
        </View>
    
);

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
        width: 200, // Ancho de la imagen
        height: 200, // Altura de la imagen
        marginTop: 20,
        // alignSelf: 'flex-end',
      },
      logoutButton: {
        backgroundColor: "#ffffff80",
      padding: 10,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#fff',
      margin: 10,
      marginTop: 100,
      },
      registerLink: {
        color: "#000",
      },
});