import React from 'react';
import CalendarioStack from './calendarioStack';
import ServiciosStack from './serviciosStack';
import UbicacionStack from './UbicacionStack';
import InicioStack from './inicioStack';
import DashboardStack from './DashboardStack';
import ReservacionesStack from './ReservacionesStack';
import { Icon } from 'react-native-elements';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome5, Feather, FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const Tab = createMaterialBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName="dashboard"
      activeColor="#fff"
      inactiveColor="#90caf9"
      barStyle={{ backgroundColor: '#377bff' }}>
      <Tab.Screen
        name="dashboard"
        component={DashboardStack}
        options={{
          headerShown: false,
          title: 'Pefil',
          headerLeft: () => null,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-circle" color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Citas"
        component={ReservacionesStack}
        options={{
          title: 'Citas',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar-check-o" color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Inicio"
        component={InicioStack}
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Calendario"
        component={CalendarioStack}
        options={{
          title: 'Calendario',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="calendar" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Ubicacion"
        component={UbicacionStack}
        options={{
          title: 'Ubicación',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="directions" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Servicios"
        component={ServiciosStack}
        options={{
          title: 'Servicios',
          tabBarIcon: ({ color, size }) => (
            <Feather name="scissors" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
