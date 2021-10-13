import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from '../pantallas/inicio';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function InicioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Inicio"
        component={Inicio}
        options={{
          title: 'Inicio',
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
