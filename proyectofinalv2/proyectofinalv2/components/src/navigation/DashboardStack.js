import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pantallas/dashboard';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

export default function Dashboardtack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Perfil',
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: '#377bff',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}
