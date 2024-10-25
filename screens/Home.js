import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';


export default function Home() {
  const navigation = useNavigation();

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style = {styles.Principal}>
              <View style = {styles.Principal2}>
                <Image source={require('../assets/I1.png')} style={styles.ImagenPrincipal}/>
                <Text style = {styles.PrincipalTitulo}>CrimenCraft</Text>
              </View>
              <Text style = {styles.PrincipalSlogan}>Juntos hacemos la diferencia</Text>
              <Text style = {styles.PrincipalFrase}>Reporta y visualiza crímenes ocurridos en la ciudad de Tuluá</Text>
        </View>
      
          <View style = {styles.PrincipalAbajo}>
              <View style = {styles.PrincipalBoton}>
              <TouchableOpacity onPress={()=> navigation.navigate('Registro de crímenes')} style={styles.boxbutton} >
                <Text style={styles.textbutton}>Registra un crímen</Text>
                  </TouchableOpacity>
              </View>
             
                <View style = {styles.PrincipalUltimosBotones}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Inicio de sesión')}
                  >
                    <Text style={styles.registerLink}>Inicia sesión</Text>
                  </TouchableOpacity>
    
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Registrarse')}
                  >
                    <Text style={styles.registerLink}>Crea tu cuenta</Text>
                  </TouchableOpacity>
                  </View>

          </View>
              </ScrollView>
    );
  }
  export const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      position: "relative",
      width: "412px",
      height: "917px",
      background: "#FEFEFE",
    },
    Principal: {
      flexDirection: "column",
      // justifyContent: "center",
      padding: 30,
      paddingVertical: 50,
      gap: 10,
      width: 412,
      height: 500,
    },
    Principal2: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    ImagenPrincipal: {
      width: 100,
      height: 100,
    },
    PrincipalTitulo: {
      // fontFamily: "Poppins",
      fontSize: 16,
      fontWeight: "bold",
      color:"#2E3A47",
      alignItems: "center",
    },
    PrincipalSlogan: {
      // fontFamily: "Poppins",
      fontSize: 45,
      fontWeight: "bold",
      color:"#2E3A47",
      padding: 10,
      textAlign: "left",
      marginTop: 30,
    },
    PrincipalFrase: {
      // fontFamily: "Poppins",
      fontSize: 18,
      fontWeight: "bold",
      color:"#2E3A47",
      textAlign: "center",
      padding: 10,
    },
    PrincipalAbajo: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: '100%',
      height: 340,
      backgroundColor: "#E5F4F1",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
    PrincipalBoton: {
      alignItems: "center",
      padding: 10,
      width: 412,
      height: 173.5,
    },

    boxbutton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#50AB89",
    padding: 10,
    borderRadius: 100,
    width: 277,
    height: 44,

  },
  textbutton:{
    fontWeight: "bold",
    color: "#fff",
  },
  PrincipalUltimosBotones: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  registerLink: {
    color: "#2E3A47", 
    fontWeight: 'bold',
    // textDecorationLine: "underline",
    fontSize: 16,
    padding: 10,
  },
  });