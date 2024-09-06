import {Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as React from 'react';
import { FIREBASE_AUTH } from "../firebase-config";
import { useNavigation } from '@react-navigation/native';
import {getCurrentUser} from '../utils/Acciones';


export default function Perfil() {
    const navigation = useNavigation();
    const user = getCurrentUser();
    const handleLogout = async () => {
        try {
          await FIREBASE_AUTH.signOut();
          console.log('Cerrando sesión...');
          navigation.navigate('Home'); 
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      };

return(
    <View style={styles.container}>
        <Image source={require('../assets/fondo.png')} style={[styles.imagefondo, StyleSheet.absoluteFill]} />
        <Text style={styles.tittle}>Información</Text>
        <Image source={require('../assets/Otp.png')} style={styles.imageStyle} />
        <View style={styles.containercorreo}>
        <Text style={styles.texto}>Correo electrónico asociado: </Text>
        <Text style={styles.correo}>{user.email}</Text>
        </View>
        <View style={styles.enlaces}>
        <TouchableOpacity
                onPress={() => navigation.navigate('Cambiar Contraseña')}
              >
                <Text style={styles.registerLink}>Cambiar Contraseña</Text>
              </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.OutLink}> Cerrar sesión</Text>
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
        marginTop: 10,
      },
      imageStyle: {
        width: 200, 
        height: 200, 
      },
      enlaces: {
        marginTop: 50,
      },
      logoutButton: {
        backgroundColor: "#ffffff80",
      padding: 10,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#fff',
      margin: 10,
      },
      containercorreo: {
        alignItems: 'center',
      },
      texto: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
      },
      registerLink: {
        color: "#000",
        fontWeight: 'bold',
        textDecorationLine: "underline",
      },
      OutLink: {
        color: "#000",
        fontWeight: 'bold',
      },
});