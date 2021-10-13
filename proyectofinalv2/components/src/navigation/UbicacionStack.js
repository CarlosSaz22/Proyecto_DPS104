import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Ubicacion from '../pantallas/Ubicacion';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function UbicacionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ubicación"
        component={Ubicacion}
        options={{
          title: 'Ubicación',
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
