import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  StatusBar,
  Image,
} from 'react-native';
import { ListItem, Avatar, Divider } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import firebase from '../Conexion/database';
import color from '../utils/colors';
import { query, where, orderBy } from 'firebase/firestore';

class Reservaciones extends Component {
  constructor() {
    super();

    this.firestoreRef = firebase.firestore().collection('reservaciones');
    this.state = {
      photoURL: firebase.auth().currentUser.photoURL,
      displayName: firebase.auth().currentUser.displayName,
      isLoading: true,
      reserArr: [],
      clientsArr: [],
      allArr: [],
    };
  }

  componentDidMount() {
    const id = firebase.auth().currentUser.uid;

    const consulta = firebase
      .firestore()
      .collection('reservaciones')
      .where('id', '==', id);

    this.unsubscribe = consulta.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const reserArr = [];
    const clientsArr = [];
    const allArr = [];
    querySnapshot.forEach((res) => {
      const { nombres, usuario, apellidos, fecha, hora, foto,descripcion } = res.data();

      allArr.push({
        key: res.id,
        res,
        nombres,
        usuario,
        apellidos,
        fecha,
        hora,
        foto,
        descripcion
      });
      console.log(allArr);
    });
    this.setState({
      reserArr,
      clientsArr,
      allArr,
      isLoading: false,
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#377bff" />
        </View>
      );
    }
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <StatusBar backgroundColor={color.BLUE} translucent={true} />
          <ScrollView style={{ marginLeft: -10 }}>
            {this.state.allArr.length == 0 ? (
              <View style={styles.msgerror}>
                <Text style={styles.textStyle}>No ha hecho citas</Text>
              </View>
            ) : (
              this.state.allArr.map((item, i) => {
                return (
                  console.log(item.nombres),
                  (
                    <ListItem
                      bottomDivider
                      style={{
                        borderBottomColor: 'gray',
                        borderBottomWidth: 2,
                      }}
                      onPress={() => {
                        this.props.navigation.navigate('DetallesReserva', {
                          nombres: item.nombres,
                          fecha: item.fecha,
                          hora: item.hora,
                          foto: item.foto,
                          usuario: item.usuario,
                          apellidos: item.apellidos,
                          key: item.key,
                          descripcion:item.descripcion,
                        });
                      }}>
                      <Avatar
                        rounded
                        size="large"
                        source={{
                          uri: this.state.photoURL,
                        }}
                      />

                      <ListItem.Content>
                        <ListItem.Title>
                          {item.nombres} {item.apellidos}
                        </ListItem.Title>
                        <ListItem.Subtitle>{item.usuario}</ListItem.Subtitle>
                        <ListItem.Subtitle>{item.fecha}</ListItem.Subtitle>
                        <ListItem.Subtitle>{item.hora}</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
                  )
                );
              })
            )}
          </ScrollView>
        </View>
        <View>
          <Button
            mode="contained"
            style={styles.boton}
            onPress={() => this.props.navigation.navigate('Filtrar')}>
            Filtrar Citas
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  msgerror: {
    justifyContent: 'center',
    alignItems: 'center',
    margintop: 100,
  },

  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boton: {
    backgroundColor: '#377bff',
    color: 'white',
  },
});

export default Reservaciones;
