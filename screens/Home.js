import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';


export default function Home() {
  const navigation = useNavigation();

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.tittle}>Bienvenidos a CrimenCraft</Text>
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
              </ScrollView>
    );
  }
  export const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center', 
      backgroundColor: '#dfe9f5',
    },
  tittle: {
    fontFamily: "",
     fontSize: 30,
     fontWeight: "bold",
      marginTop: 20,
      textAlign : "center",
    },
  boxbutton: {
    backgroundColor: "#FF000080",
    padding: 5,
    paddingVertical: 45,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: 'red',
    marginTop: 30,
    marginBottom: 30,

  },
  textbutton:{
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 30,
  },
  registerText: {
    marginRight: 5, 
  },
  registerLink: {
    color: "#000", 
    fontWeight: 'bold',
    textDecorationLine: "underline",
  },
  });