import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  StatusBar,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import firebase from '../Conexion/database';
import color from '../utils/colors';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  forgotPassword = (email) => {
    if (this.state.email.trim() === '') {
      Alert.alert('Error', 'Error.Por favor ingrese su correo');
    } else {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function (user) {
          Alert.alert(
            'Recuperación de contrareña éxitosa',
            'Revise su correo y siga las indicaciones proporcionadas'
          );
        })
        .catch(function (error) {
          if (error.code === 'auth/invalid-email') {
            Alert.alert('Error', 'El correo no es válido!');
          }

          if (error.code === 'auth/user-not-found') {
            Alert.alert('Error', 'La cuenta no existe');
          }
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
            <Text style={styles.textregistro}>Recupera tu contraseña</Text>
            <Input
              style={styles.input}
              placeholder="Email"
              underlineColor="#f5f5f5"
              leftIcon={<Icon name="user" size={24} color="#377bff" />}
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, 'email')}
            />

            <View style={styles.espacio}>
              <Pressable
                style={styles.button}
                onPress={() => this.forgotPassword(this.state.email)}>
                <Text style={styles.text}>Recuperar</Text>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
