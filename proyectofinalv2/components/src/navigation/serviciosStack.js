import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Servicios from '../pantallas/servicios';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
const Stack = createStackNavigator();
export default function CredencialesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Servicios"
        component={Servicios}
        options={{
          title: 'Servicios',
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
