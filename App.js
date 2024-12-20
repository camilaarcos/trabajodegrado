import { StyleSheet, View, Modal, TouchableOpacity, Text, Button, Image } from 'react-native';
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import LogIn from "./screens/LogIn";
import SignIn from './screens/SignIn';
import Home from './screens/Home';
import Inicio from './screens/Inicio';
import Registro from './screens/Registro';
import Mapas from './screens/Mapas';
import Perfil from './screens/Perfil';
import RecoverPassword from './screens/RecuperarContraseña';
import CambiarContraseña from './screens/CambiarContraseña';
import MostrarCrimen from './screens/MostrarCrimen';
import MostrarUsuario from './screens/MostrarUsuario';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from "./src/config/firebase";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CustomTabIcon({ name, color, size, backgroundColor }) {
  return (
    <View style={[styles.iconContainer, { backgroundColor }]}>
      <Ionicons name={name} color={color} size={size} />
    </View>
  );
}


function MyTabs({openMenu}) {

  return (
    <Tab.Navigator initialRouteName="Inicio"
    screenOptions={{
      tabBarStyle: {
        padding: 5,
        paddingBottom: 5,
      },
    }} >
      <Tab.Screen name="Inicio" component={Inicio} options={{
        tabBarIcon: ({ focused, size }) => (
          <Ionicons name="home" color={focused ? '#50AB89' : 'gray'} size={size} />
        ),tabBarActiveTintColor: '#50AB89',
        tabBarInactiveTintColor: 'gray',
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Image source={require('./assets/I1.png')} style={{ width: 70, height: 70}} />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>CrimenCraft</Text>
            <TouchableOpacity style ={{marginLeft:150}} onPress={openMenu}>
            <Ionicons name="menu" size={34} color="black" />
          </TouchableOpacity>
          </View>
          ),
          headerStyle: {
            backgroundColor: '#FEFEFE',
            height: 100,
          },
  }}/>
      <Tab.Screen name=" " component={Registro}
       options={{
        tabBarIcon: ({ color, size, focused }) => (
          <CustomTabIcon 
            name="add" 
            color={focused ? 'white' : 'gray'} 
            size={size + 10} 
            backgroundColor={focused ? '#50AB89' : '#E5F4F1'} 
          />
        ),
        
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight:50 }}>CrimenCraft</Text>
            <TouchableOpacity style ={{paddingHorizontal:165}} onPress={openMenu}>
            <Ionicons name="menu" size={34} color="black" />
          </TouchableOpacity>
          </View>
          ),
          headerStyle: {
            backgroundColor: '#FEFEFE',
          },
          }} />
     
  <Tab.Screen name="Mapas" component={Mapas}options={{
        tabBarIcon: ({ focused, size }) => (
          <Ionicons name="bar-chart-outline" color={focused ? '#50AB89' : 'gray'} size={size} />
        ),tabBarActiveTintColor: '#50AB89',
        tabBarInactiveTintColor: 'gray',
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Image source={require('./assets/I1.png')} style={{ width: 70, height: 70}} />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>CrimenCraft</Text>
            <TouchableOpacity style ={{marginLeft:150}} onPress={openMenu}>
            <Ionicons name="menu" size={34} color="black" />
          </TouchableOpacity>
          </View>
          ),
          headerStyle: {
            backgroundColor: '#FEFEFE',
            height: 100,
          },
  }} />

    </Tab.Navigator>
  );
}

function MainStack({setIsLoggedIn}) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleCerrarSesion = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      console.log('Cerrando sesión...');
      navigation.navigate('Home'); 
      setIsLoggedIn(false);
      setModalVisible(false); 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
    
  };
  return (
    <View style={{ flex: 1 }}>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false
          }} />
      <Stack.Screen name="MyTabs" options={{ headerShown: false }}>
        {props => <MyTabs {...props} openMenu={() => setModalVisible(true)} />}
      </Stack.Screen>
      <Stack.Screen name="Inicio de sesión" options={
        {    headerTitle: () => (
          <Text style={{ fontWeight: 'bold', textAlign: 'left'}}> </Text>
        ),
          headerStyle: {
            backgroundColor: '#FEFEFE',
          },
        }
      } >
      {props => <LogIn {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen> 
        <Stack.Screen name="Registrarse" component={SignIn}  options={{
              headerTitle: () => (
                <Text style={{ fontWeight: 'bold', textAlign: 'left'}}> </Text>
              ),
          headerStyle: {
            backgroundColor: '#FEFEFE',
          },}} />
        <Stack.Screen name="Inicio" >
          {props => <Inicio {...props} openMenu={() => setModalVisible(true)} />} 
        </Stack.Screen>
  <Stack.Screen name="RecoverPassword" component={RecoverPassword} 
   options={{
    headerTitle: () => (
      <Text style={{ fontWeight: 'bold', textAlign: 'left'}}> </Text>
    ),
  headerStyle: {
    backgroundColor: '#FEFEFE',
  },}} />
  <Stack.Screen name="Cambiar Contraseña" component={CambiarContraseña}
   options={{
    headerTitle: () => (
      <Text style={{ fontWeight: 'bold', textAlign: 'left'}}> </Text>
    ),
  headerStyle: {
    backgroundColor: '#FEFEFE',
  },}} />
  <Stack.Screen name="Registro de crímenes" component={Registro} 
   options={{
    headerTitle: () => (
      <Text style={{ fontWeight: 'bold', textAlign: 'left'}}> </Text>
    ),
      }}/>
  <Stack.Screen name="MostrarCrimen" component={MostrarCrimen} 
    options={{
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('./assets/I1.png')} style={{ width: 50, height: 50, marginRight: 10 }} />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>CrimenCraft</Text>
        </View>
        ),}}/>
  <Stack.Screen name="MostrarUsuario" component={MostrarUsuario}
   options={{
    headerTitle: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('./assets/I1.png')} style={{ width: 50, height: 50, marginRight: 10 }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>CrimenCraft</Text>
      </View>
      ),}}/>
  <Stack.Screen name="Perfil" component={Perfil} 
   options={{
    headerTitle: () => (
      <Text style={{ fontWeight: 'bold', textAlign: 'left'}}> </Text>
      ),}}/>
  <Stack.Screen name="Mapas" >
          {props => <Mapas {...props} openMenu={() => setModalVisible(true)} />} 
        </Stack.Screen>
    </Stack.Navigator>
    
  <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <TouchableOpacity
        style={styles.modalPerfilButton}
        onPress={()=> {navigation.navigate('Perfil'); setModalVisible(false); }
        }
      > 
        <Text style={styles.modalPerfilButtonText}>Ver Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.modalButton}
        onPress={handleCerrarSesion}
      >
        <Text style={styles.modalButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.modalCloseButton} 
      onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={25} color="black" />
          </TouchableOpacity>
    </View>
  </View>
</Modal>
</View>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <NavigationContainer>
      <MainStack setIsLoggedIn={setIsLoggedIn}/>
    
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'flex-end',
    // justifyContent: 'space-evenly',
    marginTop: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 200,
    padding: 20,
    height: 140,
    backgroundColor: '#fefefe',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPerfilButton: {
    paddingVertical: 5,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalPerfilButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalButton: {
    paddingVertical: 5,
    width: '100%',
    height: 30,
    backgroundColor: '#E32636',
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  modalButtonText: {
    color: '#fefefe',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});