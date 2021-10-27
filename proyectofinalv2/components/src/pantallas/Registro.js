import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  StatusBar,
  Alert,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-elements';
import { AntDesign, Foundation } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import firebase from '../Conexion/database';
import color from '../utils/colors';
import { FontAwesome5, Feather, FontAwesome } from '@expo/vector-icons';
let contador1 = 1;
let contador2 = 1;
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      password2: '',
      isLoading: false,
      secureTextEntry: true,
      secureTextEntry2: true,
      icon1: 'eye-slash',
      icon2: 'eye-slash',
      usuario: '',
      url:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg',
    };
  }

  cambiarPantalla() {
    this.props.navigation.navigate('Login');
    this.reset();
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  showorhidenpass = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry,
    });

    if (contador1 == 0) {
      this.setState({
        icon1: 'eye-slash',
      });
      contador1 = 1;
    } else if (contador1 == 1) {
      this.setState({
        icon1: 'eye',
      });
      contador1 = 0;
    }
  };

  reset = () => {
    this.setState({
      email: '',
      password: '',
      password2: '',
      isLoading: false,
      secureTextEntry: true,
      secureTextEntry2: true,
      icon1: 'eye-slash',
      icon2: 'eye-slash',
      usuario: '',
      url:
        'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg',
      nombres: '',
      apellidos: '',
    });
  };

  showorhidenpass2 = () => {
    this.setState({
      secureTextEntry2: !this.state.secureTextEntry2,
    });

    if (contador2 == 0) {
      this.setState({
        icon2: 'eye-slash',
      });
      contador2 = 1;
    } else if (contador2 == 1) {
      this.setState({
        icon2: 'eye',
      });
      contador2 = 0;
    }
  };

  userCreate = () => {
    if (
      this.state.email.trim() === '' ||
      this.state.password.trim() === '' ||
      this.state.password2.trim() === '' ||
      this.state.usuario.trim() === ''
    ) {
      Alert.alert('Error', 'Por favor no deje campos vacios!');
    } else if (this.state.password.length < 6) {
      Alert.alert(
        'Error',
        'La contraseña debe tener por lo menos 6 caracteres'
      );
    } else if (this.state.password != this.state.password2) {
      Alert.alert(
        'Error',
        'La contraseñas ingresadas no coinciden,por favor ingrese los datos nuevamente'
      );
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          const user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: this.state.usuario,
            photoURL: this.state.url,
          });
          Alert.alert('Usuario registrado con éxito!');
          this.setState({
            email: '',
            password: '',
            password2: '',
            isLoading: false,
            secureTextEntry: true,
            secureTextEntry2: true,
            icon1: 'eye',
            icon2: 'eye',
            usuario: '',
            url:
              'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg',
          });
          this.props.navigation.navigate('Login');
        })

        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Error', 'El correo ya ha sido registrado!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('Error', 'El correo no es válido!');
          }

          console.error(error);
        });
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.contenido}>
          <StatusBar backgroundColor={color.BLUE} translucent={true} />
          <Image style={styles.banner} source={require('../img/logo.png')} />

          <View style={styles.cajita3}>
            <Text style={styles.textregistro}>Crea tu cuenta</Text>

            <Input
              style={styles.input}
              placeholder="Correo"
              underlineColor="#f5f5f5"
              leftIcon={<Foundation name="mail" size={24} color="#377bff" />}
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, 'email')}
            />
            <Input
              style={styles.input}
              placeholder="Nombre de usuario"
              underlineColor="#f5f5f5"
              leftIcon={<Icon name="user" size={24} color="#377bff" />}
              value={this.state.usuario}
              onChangeText={(val) => this.updateInputVal(val, 'usuario')}
            />
            <Input
              style={styles.input}
              placeholder="Ingresar contraseña"
              leftIcon={<Icon name="lock" size={24} color="#377bff" />}
              rightIcon={
                <TouchableOpacity onPress={this.showorhidenpass}>
                  <Icon name={this.state.icon1} size={20} color="#377bff" />
                </TouchableOpacity>
              }
              secureTextEntry={this.state.secureTextEntry}
              value={this.state.password}
              onChangeText={(val) => this.updateInputVal(val, 'password')}
              maxLength={15}
            />
            <Input
              style={styles.input}
              placeholder="Confirmar contraseña"
              leftIcon={<Icon name="lock" size={24} color="#377bff" />}
              rightIcon={
                <TouchableOpacity onPress={this.showorhidenpass2}>
                  <Icon name={this.state.icon2} size={20} color="#377bff" />
                </TouchableOpacity>
              }
              secureTextEntry={this.state.secureTextEntry2}
              value={this.state.password2}
              onChangeText={(val) => this.updateInputVal(val, 'password2')}
              maxLength={15}
            />
            <View style={styles.espacio}>
              <Pressable
                style={styles.button}
                onPress={() => this.userCreate()}>
                <Text style={styles.text}>Registrarse</Text>
              </Pressable>
            </View>
            <View style={styles.espacio}>
              <Pressable
                style={styles.button2}
                onPress={() => this.cambiarPantalla()}>
                <Text style={styles.text2}>Volver a inicio de sesión</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contenido: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.WHITE,
    padding: 40,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  banner: {
    alignItems: 'center',
    height: 200,
    width: 200,
  },
  cajita3: {
    // height: 600,
    height: 450,
    width: 300,
    alignItems: 'center',
  },
  textregistro: {
    color: color.PRIMARYCOLOR,
    fontSize: 20,
    textAlign: 'center',
  },
 

  input: {
    color: color.PRIMARYCOLOR,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    width: 250,
    height: 60,
    paddingHorizontal: 32,
    borderRadius: 60,
    elevation: 3,
    backgroundColor: color.PRIMARYCOLOR,
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    width: 250,
    height: 60,
    paddingHorizontal: 32,
    borderRadius: 60,
    elevation: 3,
    backgroundColor: color.WHITE,
  },
  text2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: color.PRIMARYCOLOR,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  espacio: {
    margin: 10,
  },
});
