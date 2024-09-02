import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';


export default function Home() {
  const navigation = useNavigation();

    return (
      <View style={styles.container}>
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
      </View>
    );
  }
  const styles = StyleSheet.create({
  container:{ 
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#84b6f4',
  },
  imagefondo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tittle: {
    fontFamily: "",
     fontSize: 30,
     fontWeight: "bold",
      marginTop: 50,
      textAlign : "center",
    },
    imageStyle: {
      width: 200, // Ancho de la imagen
      height: 200, // Altura de la imagen
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
    color: "#4d82bc", 
    fontWeight: 'bold',
    textDecorationLine: "underline",
  },
  imageAbajo: {
    marginTop: 50,
    width: 100, // Ancho de la imagen
    height: 100, // Altura de la imagen
    alignSelf: 'flex-end',
  },
  });