import React, { Component } from 'react';
import { Container, LoadingIcon } from '../utils/style';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import firebase from '../Conexion/database';
import color from '../utils/colors';
import * as Animatable from 'react-native-animatable';

export default class Splash extends Component {
  cambiarPantalla() {
    this.props.navigation.navigate('Login');
  }

  componentDidMount() {
    setTimeout(
      () => {
        this.cambiarPantalla();
      },
      4000,
      this
    );
  }

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }
  //tallerdps104@gmail.com
  render() {
    return (
      <View style={estilo.image}>
        <StatusBar backgroundColor={color.BLUE} translucent={true} />
        <Animatable.Image
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={{
            width: 300,
            height: 300,
            margin: 100,
          }}
          source={require('../img/logo.png')}
        />
        <LoadingIcon size="large" color="#377bff" />
        <Text style={estilo.texto}>Cargando</Text>
      </View>
    );
  }
}

const estilo = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  texto: {
    color: color.PRIMARYCOLOR,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
