import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Button,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import firebase from '../Conexion/database';
import color from '../utils/colors';
import { Avatar } from 'react-native-elements';
export default class DetallesReserva extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hora: this.props.route.params.hora,
      fecha: this.props.route.params.fecha,
      nombres: this.props.route.params.nombres,
      apellidos: this.props.route.params.apellidos,
      foto: this.props.route.params.foto,
      usuario: this.props.route.params.usuario,
      key: this.props.route.params.key,
    };
  }

  cancelarcita = (key) => {
    const db = firebase.firestore();
    db.collection('reservaciones')
      .doc(key)
      .delete()
      .then(() => {
        Alert.alert('Éxito', 'Su cita ha sido cancelada');
        this.props.navigation.navigate('Reservaciones');
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={color.BLUE} translucent={true} />
        <View style={styles.espacio}>
          <Text style={styles.textStyle}>Detalles de su reserva</Text>
        </View>

        <Text style={styles.textStyle}>Foto del cliente</Text>
        <Avatar
          rounded
          size={100}
          source={{
            uri: this.state.foto,
          }}
        />
        <Text style={styles.textStyle}>Nombre completo</Text>
        <Text style={styles.textStyle}>
          {this.state.nombres} {this.state.apellidos}
        </Text>

        <Text style={styles.textStyle}>Usuario</Text>
        <Text style={styles.textStyle}>{this.state.usuario}</Text>

        <Text style={styles.textStyle}>Fecha de reserva</Text>
        <Text style={styles.textStyle}>{this.state.fecha}</Text>

        <Text style={styles.textStyle}>Hora de reserva</Text>
        <Text style={styles.textStyle}>{this.state.hora}</Text>

        <View style={styles.cajita3}>
          <View style={styles.espacio}>
            <Button
              style={styles.boton}
              color="#d32f2f"
              title="Cancelar cita"
              onPress={() => this.cancelarcita(this.state.key)}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  textStyle: {
    fontSize: 25,

    textAlign: 'center',
  },
  boton: {
    margin: 10,
  },
  cajita3: {
    height: 50,
    width: 300,

    alignItems: 'center',
  },
  espacio: {
    margin: 5,
  },
});
