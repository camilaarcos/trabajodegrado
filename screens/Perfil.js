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
        <Text style={styles.tittle}>Perfil</Text>
        <Image source={require('../assets/I1.png')} style={styles.imageStyle} />
        <View style={styles.containercorreo}>
        <Text style={styles.nombre}><Text style={styles.texto}>Nombre: </Text>{name}</Text>
        <Text style={styles.texto}>Correo electrónico asociado: </Text>
        <Text style={styles.nombre}>{email}</Text>
        <Text style={styles.nombre}><Text style={styles.texto}>Rol: </Text>{userRole}</Text>
        </View>
        {userRole === 'Administrador' && (
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
        backgroundColor: '#fefefe',
      },
      tittle: {
        fontSize: 40,
        color: '#2E3A47',
        fontWeight: 'bold',
        marginTop: 10,
      },
      imageStyle: {
        width: 100, 
        height: 100, 
      },
      enlaces: {
        flexDirection: 'column',
        marginTop: 20,
        width: '100%',
        gap: 10,
      },
      logoutButton: {
        width: 257,
      backgroundColor: "#50AB89",
      padding: 10,
      borderRadius: 5,
      margin: 10,
      alignItems: 'center',
      marginLeft: 65,
      },
      containercorreo: {
        width: '90%',
        justifyContent: 'center',
        backgroundColor: '#E5F4F1',
        padding: 10,
        gap: 10,
        borderRadius: 20,
        margin: 10,
      },
      texto: {
        fontSize: 14,
        color: '#2E3A47',
        fontWeight: 'bold',
      },
      nombre: {
        fontSize: 14,
        color: '#2E3A47',
      },
      registerLink: {
        color: "#00AFFF",
        fontWeight: 'bold',
        textAlign: 'right',
        marginRight: 20,
      },
      OutLink: {
        color: "#fff",
        fontWeight: 'bold',
      },
    containerUsuarios: {
      width: '90%',
      backgroundColor: '#E5F4F1',
      padding: 10,
      gap: 10,
      alignItems: 'flex-start',
      borderRadius: 20,
      marginTop: 10,
    },
    usuarioContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width : '100%',
      padding: 10,
      gap: 10,
      backgroundColor: '#fefefe',
      borderRadius: 15,
      },
      textoCrimen: {
        fontSize: 14,
        color: '#2E3A47',
      },
});