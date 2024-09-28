import {Text, View, Image, StyleSheet, TouchableOpacity} from "react-native";
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from "../src/config/firebase";
import { useNavigation } from '@react-navigation/native';
import {fetchUsuarios, fetchUserData} from '../utils/Acciones';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function Perfil() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = React.useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [userRole, setUserRole] = useState('');
    const [email, setEmail] = useState('');
    const handleLogout = async () => {
        try {
          await FIREBASE_AUTH.signOut();
          console.log('Cerrando sesión...');
          navigation.navigate('Home'); 
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      };

      useEffect(() => {
        const getUserData = async () => {
          const result = await fetchUserData();
          if (result.statusResponse) {
              setName(result.data.nombre);
              setEmail(result.data.correo);
              setUserRole(result.data.rol);
          } else {
              console.log(result.error);
          }
      };

      getUserData();
      const unsubscribe = fetchUsuarios((result) => {
        if (result.statusResponse) {
            setUsuarios(result.data);

        } else {
            console.log(result.error);
        }
    });

    return () => unsubscribe();
      }, []);

      const handleUser = async () => {
        setModalVisible(true);
            
      };

return(
    <View style={styles.container}>
        <Text style={styles.tittle}>Perfil usuario</Text>
        <Image source={require('../assets/Otp.png')} style={styles.imageStyle} />
        <View style={styles.containercorreo}>
        <Text style={styles.nombre}><Text style={styles.texto}>Nombre: </Text>  {name}</Text>
        <Text style={styles.texto}>Correo electrónico asociado: </Text>
        <Text style={styles.nombre}>{email}</Text>
        <Text style={styles.nombre}><Text style={styles.texto}>Rol: </Text>  {userRole}</Text>
        </View>
        {userRole === 'admin' && (
                              <>
        <View style={styles.containerUsuarios}>
        <Text style={styles.texto}>Usuarios Registrados</Text>
        {usuarios.map((usuario) => (
            <TouchableOpacity  key={usuario.id} style={styles.usuarioContainer}
            onPress={()=>navigation.navigate('MostrarUsuario', { usuarioId: usuario.id })}>
              <Text style={styles.textoCrimen}>{usuario.nombre}</Text>
            </TouchableOpacity>
          ))}
          </View>
        </>
                            )}
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
        backgroundColor: '#dfe9f5',
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
        marginTop: 20,
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
      nombre: {
        fontSize: 20,
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
    containerUsuarios: {
      width: '100%',
      backgroundColor: '#ffffff80',
      padding: 10,
      alignItems: 'flex-start',
      borderRadius: 5,
      marginTop: 10,
    },
    usuarioContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width : '100%',
      padding: 10,
      backgroundColor: '#ffffff',
      borderRadius: 5,
      marginBottom: 5,
      },
      textoCrimen: {
        fontSize: 20,
        color: '#000',
      },
});