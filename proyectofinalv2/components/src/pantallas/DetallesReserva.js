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
  TextInput,
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
      descripcion: this.props.route.params.descripcion,
    };
  }

  cancelarcita = (key) => {
    const db = firebase.firestore();
    db.collection('reservaciones')
      .doc(key)
      .delete()
      .then(() => {
        Alert.alert(
          'Cita cancelada',
          'Será enviado al calendario por si quiere realizar una nueva cita, en caso de querer consultar sus citas por favor volver a seleccionar la opción citas de la barra inferior de navegación'
        );
        this.props.navigation.navigate('Calendario', {
          valor: 1,
        }); /* NO QUITAR EL PARÁMETRO "VALOR" */
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
          <Text style={styles.title}>Detalles de su reserva</Text>
        </View>

        <Avatar
          rounded
          size={100}
          source={{
            uri: this.state.foto,
          }}
        />

        <Text style={styles.textStyle}>
          {this.state.nombres} {this.state.apellidos}
        </Text>

        <Text style={styles.title}>Fecha de reserva</Text>
        <Text style={styles.textStyle}>{this.state.fecha}</Text>

        <Text style={styles.title}>Hora de reserva</Text>
        <Text style={styles.textStyle}>{this.state.hora}</Text>

        <Text style={styles.title}>Descripción del servicio</Text>

        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Descripción del servicio"
          value={this.state.descripcion}
          editable={false}
          placeholderTextColor="grey"
          numberOfLines={4}
          multiline={true}
        />

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
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: 20,

    textAlign: 'center',
  },
  boton: {
    margin: 10,
  },
  cajita3: {
    height: 50,
    width: 300,
    margin: 5,

    alignItems: 'center',
  },
  espacio: {
    margin: 5,
  },
  textArea: {
    height: 70,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    width: '60%',
    marginTop: 15,
    marginRight: 5,
    marginLeft: -5,
    marginBottom: 10,
    color: '#000',
    paddingHorizontal: 20,
  },
});
