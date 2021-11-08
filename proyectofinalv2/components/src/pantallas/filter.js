import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TextInput,
  Item,
} from 'react-native';
import { ListItem, Avatar, Input } from 'react-native-elements';
import firebase from '../Conexion/database';
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
  Feather,
} from '@expo/vector-icons';

class Filter extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('reservaciones');
    this.state = {
      isLoading: true,
      allArr: [],
      filteredRecipes: [],
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
    const allArr = [];

    querySnapshot.forEach((res) => {
      const { nombres, apodo, apellidos, fecha, hora, usuario, foto,descripcion } =
        res.data();

      allArr.push({
        key: res.id,
        res,
        nombres,
        apellidos,
        fecha,
        hora,
        usuario,
        foto,
        descripcion
      });
    });
    this.setState({
      allArr,
      isLoading: false,
    });
  };
  SearchFilterRecipes(textToSearch) {
    console.log(textToSearch);
    this.setState({
      filteredRecipes: this.state.allArr.filter(
        (i) =>
          i.fecha.toLowerCase().includes(textToSearch.toLowerCase()) ||
          i.nombres.toLowerCase().includes(textToSearch.toLowerCase()) ||
          i.hora.toLowerCase().includes(textToSearch.toLowerCase())
      ),
    });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <ScrollView>
        <ScrollView style={styles.container}>
          <View style={styles.searchSection}>
            <Feather
              style={styles.searchIcon}
              name="search"
              size={24}
              color="black"
            />
            <Input
              style={styles.input}
              onChangeText={(text) => {
                this.SearchFilterRecipes(text);
              }}
              placeholder={'Search'}
            />
          </View>

          {this.state.filteredRecipes.map((item, i) => {
            return (
              <ListItem
                bottomDivider
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: 2,
                }}
                onPress={() => {
                  this.props.navigation.navigate('Detalle', {
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
            );
          })}
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
  },
  input: {
    marginTop: 20,
  },
  searchIcon: {
    marginLeft: 30,
  },
  container: {
    flex: 1,
    paddingBottom: 22,
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
});

export default Filter;
