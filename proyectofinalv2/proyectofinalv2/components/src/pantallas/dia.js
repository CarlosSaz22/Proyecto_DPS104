import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ListItem, Icon, Card } from 'react-native-elements';
import PagerView from 'react-native-pager-view';
import { DataTable, Button } from 'react-native-paper';
import Navigation from '../navigation/navigation';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getUsuarios } from '../Conexion/Backend';
import color from '../utils/colors';

import firebase from '../Conexion/database';

export default function Dia(props) {
  const { fecha, activar, ref } = props;
  const navigation = useNavigation();

  const dia = fecha.getDate();

  const nombreDelDiaSegunFecha = (date) =>
    ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][
      new Date(date).getDay()
    ];

  const nombreDelMes = (date) =>
    [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ][new Date(date).getMonth()];

  //const horasDisponibles = ['8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am',
  //'1:00 pm', '1:30 pm', '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm','4:00 pm']

  /**************** */

  const [horasReservadas, sethorasReservadas] = useState([]);

  function mostrar() {}

  const obtenerReservaciones = async () => {
    try {
      const fechaConsulta =
        nombreDelDiaSegunFecha(fecha) +
        ' ' +
        dia +
        ' de ' +
        nombreDelMes(fecha);

      const db = firebase.firestore();
      const resRef = db.collection('reservaciones');
      const snapshot = await resRef
        .where('fecha', '==', fechaConsulta)
        .get();
      const listaHoras = new Array();

      if (snapshot.empty) {
        // console.log('No se encontraron documentos');
      } else {
        snapshot.forEach((doc) => {
          // console.log(fechaConsulta, '==>', doc.data().hora);
          listaHoras.push(doc.data().hora);
        });

        // console.log("EL ARREGLO: " + listaHoras);

        sethorasReservadas(listaHoras);
        // console.log("EL STATE: " + horasReservadas);
        console.log(fechaConsulta, '==>', horasReservadas);
      }
    } catch (error) {
      console.log('ERROR EN ALGUNA LÍNEA DE CÓDIGO');
    }
  };

  useEffect(() => {
    obtenerReservaciones();
  }, [activar]);

  /**************** */
  return (
    <ScrollView key="0">
      <StatusBar backgroundColor={color.BLUE} translucent={true} />

      <Image
        style={styles.banner}
        source={{
          uri: 'https://media.revistagq.com/photos/5ca5e1cdbda5947b2133a967/master/w_1200,h_800,c_limit/mejores_barberias_espana_cuidado_facial__396256825.jpg',
        }}
      />
      <Text style={styles.TextCente}>
        <AntDesign name="leftcircle" size={20} color="#377bff" />{' '}
        {nombreDelDiaSegunFecha(fecha) +
          ' ' +
          dia +
          ' de ' +
          nombreDelMes(fecha)}{' '}
        <AntDesign name="rightcircle" size={20} color="#377bff" />
      </Text>

      <Text style={styles.TextCente}>Horario de la mañana</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Hora</DataTable.Title>
          <DataTable.Title></DataTable.Title>
          <DataTable.Title>Acciones</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>8:00 am</DataTable.Cell>
          <DataTable.Cell numeric>
            {horasReservadas.indexOf('8:00 am') != -1 ? (
              <Text>Cupo reservado</Text>
            ) : (
              <Button
                style={{ fontSize: 10, backgroundColor: '#377bff' }}
                icon=""
                mode="contained"
                onPress={() => {
                  navigation.navigate('Formulario', {
                    hora: '8:00 am',
                    day:
                      nombreDelDiaSegunFecha(fecha) +
                      ' ' +
                      dia +
                      ' de ' +
                      nombreDelMes(fecha),
                  });
                }}>
                Reservar
              </Button>
            )}
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>8:30 am</DataTable.Cell>
          <DataTable.Cell numeric>
            {horasReservadas.indexOf('8:30 am') != -1 ? (
              <Text>Cupo reservado</Text>
            ) : (
              <Button
                style={{ fontSize: 10, backgroundColor: '#377bff' }}
                icon=""
                mode="contained"
                onPress={() => {
                  navigation.navigate('Formulario', {
                    hora: '8:30 am',
                    day:
                      nombreDelDiaSegunFecha(fecha) +
                      ' ' +
                      dia +
                      ' de ' +
                      nombreDelMes(fecha),
                  });
                }}>
                Reservar
              </Button>
            )}
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>9:00 am</DataTable.Cell>
          <DataTable.Cell numeric>
            {horasReservadas.indexOf('9:00 am') != -1 ? (
              <Text>Cupo reservado</Text>
            ) : (
              <Button
                style={{ fontSize: 10, backgroundColor: '#377bff' }}
                icon=""
                mode="contained"
                onPress={() => {
                  navigation.navigate('Formulario', {
                    hora: '9:00 am',
                    day:
                      nombreDelDiaSegunFecha(fecha) +
                      ' ' +
                      dia +
                      ' de ' +
                      nombreDelMes(fecha),
                  });
                }}>
                Reservar
              </Button>
            )}
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>9:30 am</DataTable.Cell>
          <DataTable.Cell numeric>
            {horasReservadas.indexOf('9:30 am') != -1 ? (
              <Text>Cupo reservado</Text>
            ) : (
              <Button
                style={{ fontSize: 10, backgroundColor: '#377bff' }}
                icon=""
                mode="contained"
                onPress={() => {
                  navigation.navigate('Formulario', {
                    hora: '9:30 am',
                    day:
                      nombreDelDiaSegunFecha(fecha) +
                      ' ' +
                      dia +
                      ' de ' +
                      nombreDelMes(fecha),
                  });
                }}>
                Reservar
              </Button>
            )}
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>10:00 am</DataTable.Cell>
          <DataTable.Cell numeric>
            {horasReservadas.indexOf('10:00 am') != -1 ? (
              <Text>Cupo reservado</Text>
            ) : (
              <Button
                style={{ fontSize: 10, backgroundColor: '#377bff' }}
                icon=""
                mode="contained"
                onPress={() => {
                  navigation.navigate('Formulario', {
                    hora: '10:00 am',
                    day:
                      nombreDelDiaSegunFecha(fecha) +
                      ' ' +
                      dia +
                      ' de ' +
                      nombreDelMes(fecha),
                  });
                }}>
                Reservar
              </Button>
            )}
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>10:30 am</DataTable.Cell>
          <DataTable.Cell numeric>
            {horasReservadas.indexOf('10:30 am') != -1 ? (
              <Text>Cupo reservado</Text>
            ) : (
              <Button
                style={{ fontSize: 10, backgroundColor: '#377bff' }}
                icon=""
                mode="contained"
                onPress={() => {
                  navigation.navigate('Formulario', {
                    hora: '10:30 am',
                    day:
                      nombreDelDiaSegunFecha(fecha) +
                      ' ' +
                      dia +
                      ' de ' +
                      nombreDelMes(fecha),
                  });
                }}>
                Reservar
              </Button>
            )}
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>11:00 am</DataTable.Cell>
          <DataTable.Cell numeric>
            {horasReservadas.indexOf('11:00 am') != -1 ? (
              <Text>Cupo reservado</Text>
            ) : (
              <Button
                style={{ fontSize: 10, backgroundColor: '#377bff' }}
                icon=""
                mode="contained"
                onPress={() => {
                  navigation.navigate('Formulario', {
                    hora: '11:00 am',
                    day:
                      nombreDelDiaSegunFecha(fecha) +
                      ' ' +
                      dia +
                      ' de ' +
                      nombreDelMes(fecha),
                  });
                }}>
                Reservar
              </Button>
            )}
          </DataTable.Cell>
        </DataTable.Row>

        <Text style={styles.TextCente}>Horario de la tarde</Text>

        <DataTable.Row>
          <DataTable.Cell>1:00 pm</DataTable.Cell>
          <DataTable.Cell numeric>
            {horasReservadas.indexOf('1:00 pm') != -1 ? (
              <Text>Cupo reservado</Text>
            ) : (
              <Button
                style={{ fontSize: 10, backgroundColor: '#377bff' }}
                icon=""
                mode="contained"
                onPress={() => {
                  navigation.navigate('Formulario', {
                    hora: '1:00 pm',
                    day:
                      nombreDelDiaSegunFecha(fecha) +
                      ' ' +
                      dia +
                      ' de ' +
                      nombreDelMes(fecha),
                  });
                }}>
                Reservar
              </Button>
            )}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <DataTable.Row>
        <DataTable.Cell>1:30 pm</DataTable.Cell>
        <DataTable.Cell numeric>
          {horasReservadas.indexOf('1:30 pm') != -1 ? (
            <Text>Cupo reservado</Text>
          ) : (
            <Button
              style={{ fontSize: 10, backgroundColor: '#377bff' }}
              icon=""
              mode="contained"
              onPress={() => {
                navigation.navigate('Formulario', {
                  hora: '1:30 pm',
                  day:
                    nombreDelDiaSegunFecha(fecha) +
                    ' ' +
                    dia +
                    ' de ' +
                    nombreDelMes(fecha),
                });
              }}>
              Reservar
            </Button>
          )}
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>2:00 pm</DataTable.Cell>
        <DataTable.Cell numeric>
          {horasReservadas.indexOf('2:00 pm') != -1 ? (
            <Text>Cupo reservado</Text>
          ) : (
            <Button
              style={{ fontSize: 10, backgroundColor: '#377bff' }}
              icon=""
              mode="contained"
              onPress={() => {
                navigation.navigate('Formulario', {
                  hora: '2:00 pm',
                  day:
                    nombreDelDiaSegunFecha(fecha) +
                    ' ' +
                    dia +
                    ' de ' +
                    nombreDelMes(fecha),
                });
              }}>
              Reservar
            </Button>
          )}
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>2:30 pm</DataTable.Cell>
        <DataTable.Cell numeric>
          {horasReservadas.indexOf('2:30 pm') != -1 ? (
            <Text>Cupo reservado</Text>
          ) : (
            <Button
              style={{ fontSize: 10, backgroundColor: '#377bff' }}
              icon=""
              mode="contained"
              onPress={() => {
                navigation.navigate('Formulario', {
                  hora: '2:30 pm',
                  day:
                    nombreDelDiaSegunFecha(fecha) +
                    ' ' +
                    dia +
                    ' de ' +
                    nombreDelMes(fecha),
                });
              }}>
              Reservar
            </Button>
          )}
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>3:00 pm</DataTable.Cell>
        <DataTable.Cell numeric>
          {horasReservadas.indexOf('3:00 pm') != -1 ? (
            <Text>Cupo reservado</Text>
          ) : (
            <Button
              style={{ fontSize: 10, backgroundColor: '#377bff' }}
              icon=""
              mode="contained"
              onPress={() => {
                navigation.navigate('Formulario', {
                  hora: '3:00 pm',
                  day:
                    nombreDelDiaSegunFecha(fecha) +
                    ' ' +
                    dia +
                    ' de ' +
                    nombreDelMes(fecha),
                });
              }}>
              Reservar
            </Button>
          )}
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>3:30 pm</DataTable.Cell>
        <DataTable.Cell numeric>
          {horasReservadas.indexOf('3:30 pm') != -1 ? (
            <Text>Cupo reservado</Text>
          ) : (
            <Button
              style={{ fontSize: 10, backgroundColor: '#377bff' }}
              icon=""
              mode="contained"
              onPress={() => {
                navigation.navigate('Formulario', {
                  hora: '3:30 pm',
                  day:
                    nombreDelDiaSegunFecha(fecha) +
                    ' ' +
                    dia +
                    ' de ' +
                    nombreDelMes(fecha),
                });
              }}>
              Reservar
            </Button>
          )}
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={styles.tabla}>
        <DataTable.Cell>4:00 pm</DataTable.Cell>
        <DataTable.Cell numeric>
          {horasReservadas.indexOf('4:00 pm') != -1 ? (
            <Text>Cupo reservado</Text>
          ) : (
            <Button
              style={{ fontSize: 10, backgroundColor: '#377bff' }}
              icon=""
              mode="contained"
              onPress={() => {
                navigation.navigate('Formulario', {
                  hora: '4:00 pm',
                  day:
                    nombreDelDiaSegunFecha(fecha) +
                    ' ' +
                    dia +
                    ' de ' +
                    nombreDelMes(fecha),
                });
              }}>
              Reservar
            </Button>
          )}
        </DataTable.Cell>
      </DataTable.Row>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  TextCente: {
    textAlign: 'center',
    fontSize: 21,
    margin: 15,
  },
  tabla: {
    marginBottom: 25,
  },
  banner: {
    height: 250,
    flex: 1,
  },
});
