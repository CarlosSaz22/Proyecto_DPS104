import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
  WebView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign, Foundation } from '@expo/vector-icons';
import { Input, SocialIcon, Button } from 'react-native-elements';
import firebase from '../Conexion/database';
import color from '../utils/colors';
import * as Google from 'expo-google-app-auth';
let contador1 = 1;
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      secureTextEntry: true,
      icon1: 'eye-slash',
      google: false,
      rol: '',
    };
  }

  async getUserInfo() {
    let currentUserUID = firebase.auth().currentUser.uid;
    let doc = await firebase
      .firestore()
      .collection('users')
      .doc(currentUserUID)
      .get();

    if (!doc.exists) {
      // Alert.alert('Datos no encontrados!');
      console.log('Datos no encontrados!');
    } else {
      let dataObj = doc.data();
      this.setState({
        rol: dataObj.rol,
      });
      if (this.state.rol == 'barbero') {
        this.cambiarPantalla4();
      } else {
        this.cambiarPantalla3();
      }
    }
  }

  cambiarPantalla3() {
    this.props.navigation.navigate('Inicio');
    this.reset();
  }

  cambiarPantalla4() {
    this.props.navigation.navigate('Iniciobarbero');
    this.reset();
  }

  cambiarPantalla() {
    this.props.navigation.navigate('Registro');
    this.reset();
  }

  cambiarPantalla2() {
    this.props.navigation.navigate('Recuperar contraseña');
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
      isLoading: false,
      secureTextEntry: true,
      icon1: 'eye-slash',
      google: false,
      rol: '',
    });
  };

  login = () => {
    this.setState({
      google: true,
    });
    const config = {
      iosClientId: `809987972404-h31ufdvdmpffbq05qrueqkelmoem3fq7.apps.googleusercontent.com`,
      androidClientId: `809987972404-msd6kiaetou41qitm7ee7evnk6rrtoi1.apps.googleusercontent.com`,
      scopes: ['profile', 'email'],
    };
    Google.logInAsync(config)
      .then((result) => {
        const { user } = result;
        const { email, name, photoUrl } = user;
        const { idToken, accessToken } = result;
        if (result.type === 'success') {
          const credential = firebase.auth.GoogleAuthProvider.credential(
            result.idToken,
            result.accessToken
          );
          firebase.auth().signInWithCredential(credential);
          setTimeout(() => this.cambiarPantalla3(), 1000);

          setTimeout(() => {
            let currentUser = firebase.auth().currentUser;
            const db2 = firebase.firestore();
            db2.collection('users').doc(currentUser.uid).set({
              email: user.email,
              rol: 'cliente',
            });
          }, 5000);

          Alert.alert('Sesión iniciada correctamente');
          this.reset();
        } else {
          Alert.alert('logueo por google fue cancelado');
        }
        this.setState({
          google: false,
        });
      })
      .catch((error) => {
        alert(error);
        this.setState({
          google: false,
        });
      });
  };

  userLogin = () => {
    if (this.state.email.trim() === '' || this.state.password.trim() === '') {
      Alert.alert('Por favor no deje campos vacios!');
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res);
          this.getUserInfo();
          console.log('Usuario logeado correctamente!');
          this.setState({
            isLoading: false,
            email: '',
            password: '',
            google: false,
            rol: '',
          });
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            Alert.alert('Datos incorrectos, ingrese sus datos correctamente');
          } else if (error.code === 'auth/invalid-email') {
            Alert.alert('El correo no es válido!');
          } else {
            Alert.alert('Usuario no válido, ingrese nuevamente sus datos');
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
            <Text style={styles.textlogin}>Inicia sesión con tu cuenta</Text>
            <Input
             keyboardType="email-address"
              style={styles.input}
              placeholder="Correo"
              underlineColor="#f5f5f5"
              leftIcon={<Foundation name="mail" size={24} color="#377bff" />}
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, 'email')}
               
            />
            <Input
              style={styles.input}
              placeholder="Contraseña"
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
            <View style={styles.espacio}>
              <Pressable style={styles.button} onPress={() => this.userLogin()}>
                <Text style={styles.text}>Iniciar sesión</Text>
              </Pressable>
            </View>

            <View style={styles.espacio}>
              <Pressable
                style={styles.button2}
                onPress={() => this.cambiarPantalla()}>
                <Text style={styles.text2}>Registrarse</Text>
              </Pressable>
            </View>
            <View style={styles.espacio}>
              <Pressable style={styles.button3} onPress={() => this.login()}>
                <AntDesign name="google" size={24} color="#fff" />
                <Text style={styles.text3}>Iniciar con google</Text>
              </Pressable>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.cambiarPantalla2()}>
                <Text
                  style={[
                    styles.txtTransparent,
                    { textDecorationLine: 'underline' },
                  ]}>
                  Olvide mi Contraseña
                </Text>
              </TouchableOpacity>
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
    height: 450,
    width: 300,
    alignItems: 'center',
  },

  input: {
    color: color.PRIMARYCOLOR,
  },
  textlogin: {
    color: color.PRIMARYCOLOR,
    fontSize: 20,
    textAlign: 'center',
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
  button3: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    width: 250,
    height: 60,
    paddingHorizontal: 32,
    borderRadius: 60,
    elevation: 3,
    color: '#FFF',
    backgroundColor: '#e95936',
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
  text3: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
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
  txtTransparent: {
    color: color.LIGHTPRIMARYCOLOR,
    fontSize: 18,
    fontFamily: 'Poppins-Light',
  },
});
