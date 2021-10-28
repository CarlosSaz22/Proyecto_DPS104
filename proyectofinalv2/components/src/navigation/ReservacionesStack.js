import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Reservaciones from '../pantallas/Reservaciones';
import Filtrar from '../pantallas/filter';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
const Stack = createStackNavigator();
export default function ReservacionesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mis citas"
        component={Reservaciones}
        options={{
          title: 'Mis citas',
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: '#377bff',
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Filtrar"
        component={Filtrar}
        options={{
          title: 'Filtrar citas',

          headerStyle: {
            backgroundColor: '#377bff',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}
