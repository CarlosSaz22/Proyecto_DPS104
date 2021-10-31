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
import { ListItem, Avatar } from 'react-native-elements';
import { Button } from 'react-native-paper';
import firebase from '../Conexion/database';
import Icon from 'react-native-vector-icons';
import color from '../utils/colors';
import { FAB } from 'react-native-paper';
import { query, where, orderBy } from 'firebase/firestore';
class Reservacionesbarbero extends Component {
  constructor() {
    super();

    this.firestoreRef = firebase
      .firestore()
      .collection('reservaciones')
      .orderBy('fecha', 'desc')
      .orderBy('hora', 'desc');

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
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
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
        descripcion,
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
                        this.props.navigation.navigate('Detalle2', {
                          nombres: item.nombres,
                          fecha: item.fecha,
                          hora: item.hora,
                          foto: item.foto,
                          usuario: item.usuario,
                          apellidos: item.apellidos,
                          descripcion:item.descripcion,
                        });
                      }}>
                      <Avatar
                        rounded
                        size="large"
                        source={{
                          uri: item.foto,
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
          <Button
            mode="contained"
            style={styles.boton}
            onPress={() => this.props.navigation.navigate('Filtrar2')}>
            Filtrar Citas
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22,
  },

  banner: {
    height: 250,
    flex: 1,
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
  boton: {
    backgroundColor: '#377bff',
    color: 'white',
  },
});

export default Reservacionesbarbero;
