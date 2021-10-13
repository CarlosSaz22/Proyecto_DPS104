import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { ListItem, Icon, Card } from 'react-native-elements';
import color from '../utils/colors';

export default function Inicio(props) {
  const { navigation } = props;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={styles.pagerView}>
        <StatusBar backgroundColor={color.BLUE} translucent={true} />
        <ScrollView>
          <View style={styles.contenedor}>
            <View style={styles.cajita}>
              <Text style={styles.titulo}>Barber House Sv</Text>
              <Image source={require('../img/logo.png')} style={styles.logo} />
            </View>

            <View style={styles.cajita2}>
              <Text style={styles.titulo2}>Misión</Text>
              <Text style={styles.titulo_sub}>
                Satisfacer las necesidades en peluquería y barbería de nuestros
                clientes creando experiencias placenteras por medio de nuestros
                especialistas en el cuidado de la imagen para caballeros.
              </Text>
              <Image
                source={{
                  uri:
                    'https://minilatam.com/blog/wp-content/uploads/2019/09/que-es-lo-bueno-de-ir-a-una-barberia-MINI-1-800x386.jpg',
                }}
                style={styles.img2}
              />
            </View>

            <View style={styles.cajita3}>
              <Text style={styles.titulo2}>Visión</Text>
              <Text style={styles.titulo_sub}>
                Ser la barbería más importante en San salvador en los próximos
                10 años ofreciendo un servicio de calidad y con buena atención
                al cliente.
              </Text>
              <Image
                source={{
                  uri:
                    'https://articulosinfoguia.s3.amazonaws.com/1843/187111539608255.jpg',
                }}
                style={styles.img2}
              />
              <Text style={styles.titulo}>
                Trabajamos para resaltar tu belleza.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  cajita: {
    height: 280,
    alignItems: 'center',
  },
  cajita2: {
    height: 470,
    alignItems: 'center',
  },
  cajita3: {
    height: 530,
    alignItems: 'center',
  },
  contenedor: {
    flex: 1,
    flexDirection: 'column',
  },
  logo: {
    height: 250,
    width: 250,
  },
  img2: {
    height: 250,
    width: 450,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 15,
    textAlign: 'justify',
    fontFamily: 'Redressed-Regular',
  },

  titulo2: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 35,
    textAlign: 'justify',
    fontFamily: 'Redressed-Regular',
  },
  titulo_sub: {
    fontWeight: 'bold',
    fontSize: 14,
    margin: 20,
    textAlign: 'justify',
    fontFamily: 'Redressed-Regular',
  },
});
