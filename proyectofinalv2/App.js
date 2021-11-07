//import * as React from 'react';
import React from 'react';
import Navigation from './components/src/navigation/navigation';
import Navigation2 from './components/src/navigation/navigationbarber';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/src/pantallas/login';
import Pass from './components/src/pantallas/Recuperarpass';
import color from './components/src/utils/colors';
import Reservaciones from './components/src/pantallas/Reservaciones';
import Splash from './components/src/pantallas/splash';
import Registro from './components/src/pantallas/Registro';
import Detalles from './components/src/pantallas/DetallesReserva';
import Detalles2 from './components/src/pantallas/DetallesReservaBarber';
//mport { useFonts } from 'expo-font';
import * as Font from 'expo-font'; 
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={Splash} 
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Detalle"
          component={Detalles}
          options={{
            title: 'Detalle',
            headerStyle: {
              backgroundColor: '#377bff',
            },
            headerTintColor: '#FFF',
          }}
        />

        <Stack.Screen
          name="Detalle2"
          component={Detalles2}
          options={{
            title: 'Detalle',
            headerStyle: {
              backgroundColor: '#377bff',
            },
            headerTintColor: '#FFF',
          }}
        />

        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Inicio"
          component={Navigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Iniciobarbero"
          component={Navigation2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Recuperar contraseña"
          component={Pass}
          options={{
            title: 'Recuperar contraseña',
            headerStyle: {
              backgroundColor: '#377bff',
            },
            headerTintColor: '#FFF',
          }}
        />
        <Stack.Screen
          name="Reservaciones"
          component={Reservaciones}
          options={{
            title: 'Reservaciones',
            headerStyle: {
              backgroundColor: '#377bff',
            },
            headerTintColor: '#FFF',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
