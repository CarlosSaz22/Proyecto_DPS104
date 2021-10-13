import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { ListItem, Icon, Card } from 'react-native-elements';
import { DataTable, Button } from 'react-native-paper';
import { postUsuario } from '../Conexion/Backend';
import color from '../utils/colors';
import firebase from '../Conexion/database';
export default class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.route.params.hora,
      dia: this.props.route.params.day,
      nombre: '',
      apellido: '',
      apodo: '',
    };
  }

  render() {
    this.state = {
      nombre: '',
      apellido: '',
      apodo: '',
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
      id: firebase.auth().currentUser.email,
      time: this.props.route.params.hora,
      dia: this.props.route.params.day,
    };
    return (
      <ScrollView>
        <View style={styles.contenedor}>
          <StatusBar backgroundColor={color.BLUE} translucent={true} />
          <View style={styles.cajita}>
            <TextInput
              onChangeText={(value) => {
                this.state.nombre = value;
              }}
              placeholder="Nombres"
              keyboardType="username"
              style={styles.input}
            />
          </View>
          <View style={styles.cajita2}>
            <TextInput
              onChangeText={(value) => {
                this.state.apellido = value;
              }}
              placeholder="Apellidos"
              keyboardType="username"
              style={styles.input}
            />
          </View>
          <View style={styles.cajita3}>
            <TextInput
              placeholder="Apodo"
              keyboardType="username"
              style={styles.input}
              editable={false}
              value={this.state.displayName}
            />
          </View>

          <View style={styles.cajita3}>
            <TextInput
              onChangeText={(value) => (this.state.dia = value)}
              placeholder="Día"
              keyboardType="username"
              style={styles.input}
              editable={false}
              value={this.state.dia}
            />
          </View>

          <View style={styles.cajita3}>
            <TextInput
              onChangeText={(value) => (this.state.time = value)}
              placeholder="Hora"
              keyboardType="username"
              style={styles.input}
              editable={false}
              value={this.state.time}
            />
          </View>
          <View style={styles.cajita}>
            <Button
              style={{
                fontSize: 10,
                marginTop: 15,
                backgroundColor: '#377bff',
              }}
              icon=""
              mode="contained"
              onPress={() => {
                if (this.state.nombre === '') {
                  alert('Introduce tu nombre');
                } else if (this.state.apellido === '') {
                  alert('introduce tu apellido');
                } else {
                  postUsuario(
                    this.state.uid,
                    this.state.nombre,
                    this.state.apellido,
                    this.state.displayName,
                    this.state.dia,
                    this.state.time
                  );
                  alert(
                    'guardado existosamente',
                    this.props.navigation.navigate('Calendario')
                  );
                }
              }}>
              Guardar Datos
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: 'column',
  },
  cajita: {
    height: 80,
    alignItems: 'center',
  },
  cajita2: {
    height: 80,
    alignItems: 'center',
  },
  cajita3: {
    height: 80,
    alignItems: 'center',
  },

  input: {
    height: 50,
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
