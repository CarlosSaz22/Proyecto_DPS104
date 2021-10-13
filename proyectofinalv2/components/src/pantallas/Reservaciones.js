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
      .where('id', '==', id)
    
      

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
      const { nombres, apodo, apellidos, fecha, hora } = res.data();

      allArr.push({
        key: res.id,
        res,
        nombres,
        apodo,
        apellidos,
        fecha,
        hora,
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
                      key={i}
                      chevron
                      onPress={() => {
                        this.props.navigation.navigate('', {
                          userkey: item.key,
                        });
                      }}>
                      <ListItem.Content>
                        <Avatar
                          source={{
                            uri: this.state.photoURL,
                          }}
                        />

                        <ListItem.Title>
                          {item.nombres} {item.apellidos}
                        </ListItem.Title>
                        <ListItem.Subtitle>
                          {this.state.displayName}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle>{item.fecha}</ListItem.Subtitle>
                        <ListItem.Subtitle>{item.hora}</ListItem.Subtitle>
                      </ListItem.Content>
                      <ListItem.Chevron color="white" />
                    </ListItem>
                  )
                );
              })
            )}
          </ScrollView>
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
  msgerror: {
    justifyContent: 'center',
    alignItems: 'center',
    margintop: 100,
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
    margin: 15,
  },
  textStyle: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Reservaciones;
