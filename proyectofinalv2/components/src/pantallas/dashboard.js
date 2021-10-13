import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Button,
  Image,
  ScrollView,
} from 'react-native';
import firebase from '../Conexion/database';
import Reservaciones from '../pantallas/Reservaciones';
import color from '../utils/colors';
import { Avatar } from 'react-native-elements';
export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      uid: '',
      id: '',
    };
  }

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
      id: firebase.auth().currentUser.email,
      photoURL: firebase.auth().currentUser.photoURL,
    };

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.espacio}>
            <Text style={styles.textStyle}>Bienvenido a Barber House Sv</Text>
          </View>
          <Image source={require('../img/logo.png')} style={styles.logo} />
          <Text style={styles.textStyle}>Te estabamos esperando</Text>
          <Avatar
            rounded
            size={100}
            source={{
              uri: this.state.photoURL,
            }}
          />
          <Text style={styles.textStyle}>{this.state.displayName}</Text>

          <Text style={styles.textStyle}>¡Haz tu cita ahora!</Text>
          <View style={styles.cajita3}>
            <StatusBar backgroundColor={color.BLUE} translucent={true} />

            <View style={styles.espacio}>
              <Button
                style={styles.boton}
                color="#d32f2f"
                title="Cerrar Sesión"
                onPress={() => this.signOut()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
  },
  textStyle: {
    fontSize: 25,

    textAlign: 'center',
  },
  boton: {
    margin: 10,
  },
  cajita3: {
    height: 200,
    width: 300,

    alignItems: 'center',
  },
  espacio: {
    margin: 10,
  },
  logo: {
    height: 150,
    width: 150,
  },
});
