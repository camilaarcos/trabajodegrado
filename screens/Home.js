import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';


export default function Home() {
  const navigation = useNavigation();

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home</Text>
        <TouchableOpacity style={styles.boxbutton} >
              <Text>Registrar Crímen</Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('LogIn')} >
              <Text style={styles.login}>Inicio Sesión</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.login}>Registrarse</Text>
              </TouchableOpacity> 
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    login1: {
      width: 350,
      height: 500,
      borderColor: 'blue',
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
    },
    email: {
      fontSize: 17,
      fontWeight: '400'
    },
    input: {
      width: 250,
      height: 40,
      borderColor: '#000',
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      backgroundColor: '#00000090',
      marginBottom: 20,
    },
    login: {
      color: "#525fe1",
    },
   boxbutton: {
      backgroundColor: "#525fe1",
      padding: 10,
      borderRadius: 5,
      margin: 10,
    },
  });