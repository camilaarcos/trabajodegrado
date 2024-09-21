import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';


export default function Home() {
  const navigation = useNavigation();

    return (
      <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/fondo.png')} style={[styles.imagefondo, StyleSheet.absoluteFill]} />
        <Text style={styles.tittle}></Text>
        <Image source={require('../assets/Identity.png')} style={styles.imageStyle} />
        <TouchableOpacity onPress={()=> navigation.navigate('Registro de crímenes')} style={styles.boxbutton} >
              <Text style={styles.textbutton}>Registrar Crímen</Text>
            </TouchableOpacity>
              <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿Ya tienes cuenta?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Inicio de sesión')}
              >
                <Text style={styles.registerLink}>Inicia sesión</Text>
              </TouchableOpacity>
              </View>
              <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Registrarse')}
              >
                <Text style={styles.registerLink}>Regístrate</Text>
              </TouchableOpacity>
              </View>
              <Image source={require('../assets/Chain.png')} style={styles.imageAbajo} />
              </ScrollView>
    );
  }
  export const styles = StyleSheet.create({
    containerfuera: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flexGrow: 1,
      alignItems: 'center', 
    },
    imagefondo: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  animation: {
    position: 'absolute',
    width: '300%', 
    height: '300%', 
    top: '-60%', 
    left: '-90%', 
    transform: [{ rotate: '90deg' }],
  },
  tittle: {
    fontFamily: "",
     fontSize: 30,
     fontWeight: "bold",
      marginTop: 50,
      textAlign : "center",
    },
    imageStyle: {
      width: 200, 
      height: 200,
    },
  boxbutton: {
    backgroundColor: "#ffffff80",
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
    margin: 10,
    marginTop: 50,
  },
  textbutton:{
    fontWeight: "bold",
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
    textDecorationLine: "underline",
  },
  imageAbajo: {
    marginTop: 50,
    width: 100, 
    height: 100, 
    alignSelf: 'flex-end',
  },
  });