import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Reservaciones from '../pantallas/Reservacionesbarbero';
import Filtrar2 from '../pantallas/filterBarber';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
const Stack = createStackNavigator();
export default function ReservacionesBarberStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Todas las citas"
        component={Reservaciones}
        options={{
          title: 'Todas las citas',
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: '#377bff',
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Filtrar2"
        component={Filtrar2}
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
