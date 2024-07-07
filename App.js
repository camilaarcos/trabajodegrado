import { StyleSheet, Image } from 'react-native';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from "./screens/LogIn";
import SignIn from './screens/SignIn';
import Home from './screens/Home';
import Inicio from './screens/Inicio';
import Registro from './screens/Registro';
const Stack = createNativeStackNavigator();
export default function App() {

  return (
<NavigationContainer>
<Stack.Navigator initialRouteName="Home">
        <Stack.Screen name=" " component={Home} options={{
          headerTitle: () => (
            <Image
              style={{width: 320, height: 30}}
              source={require('./assets/nombre.png')} 
            />
          ),
    headerStyle: {
      backgroundColor: '#4d82bc', // Color de fondo de la cabecera
    },
    headerTintColor: '#000', // Color de los botones y título en la cabecera
    headerTitleStyle: {
      fontWeight: 'bold', // Estilo del título
    }, 
    headerTitleAlign: 'center', // Alineación del título
  }} />
        <Stack.Screen name="Inicio de sesión" component={LogIn} options={{
     headerTitle: () => (
            <Image
              style={{width: 320, height: 30, marginRight: 120}}
              source={require('./assets/nombre.png')} 
            />
          ),
    headerStyle: {
      backgroundColor: '#4d82bc', // Color de fondo de la cabecera
    },
    headerTintColor: '#000', // Color de los botones y título en la cabecera
    headerTitleStyle: {
      fontWeight: 'bold', // Estilo del título
    },
    headerTitleAlign: 'center', // Alineación del título
  }} />
        <Stack.Screen name="Registrarse" component={SignIn} options={{
          headerTitle: () => (
            <Image
              style={{width: 320, height: 30, marginRight: 120}}
              source={require('./assets/nombre.png')} 
            />
          ),
    headerStyle: {
      backgroundColor: '#4d82bc', // Color de fondo de la cabecera
    },
    headerTintColor: '#000', // Color de los botones y título en la cabecera
    headerTitleStyle: {
      fontWeight: 'bold', // Estilo del título
    },
    headerTitleAlign: 'center', // Alineación del título
  }} />
        <Stack.Screen name="Inicio" component={Inicio}  options={{
    headerStyle: {
      backgroundColor: '#4d82bc', // Color de fondo de la cabecera
    },
    headerTintColor: '#000', // Color de los botones y título en la cabecera
    headerTitleStyle: {
      fontWeight: 'bold', // Estilo del título
    },
    headerTitleAlign: 'center', // Alineación del título
  }}/>
        <Stack.Screen name="Registro de crímenes" component={Registro}  options={{
    headerStyle: {
      backgroundColor: '#4d82bc', // Color de fondo de la cabecera
    },
    headerTintColor: '#000', // Color de los botones y título en la cabecera
    headerTitleStyle: {
      fontWeight: 'bold', // Estilo del título
    },
    headerTitleAlign: 'center', // Alineación del título
  }}/>
      </Stack.Navigator>
      </NavigationContainer>
  );}


