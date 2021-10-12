//import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import Navigation from './components/src/navigation/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/src/pantallas/login';
import Pass from './components/src/pantallas/Recuperarpass';
import color from './components/src/utils/colors';
import { firebase } from '@firebase/app';
import '@firebase/firestore';
import Reservaciones from './components/src/pantallas/Reservaciones';
import Splash from './components/src/pantallas/splash';
import Registro from './components/src/pantallas/Registro';

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