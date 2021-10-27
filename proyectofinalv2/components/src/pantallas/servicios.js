import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Modal,
  Button,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import color from '../utils/colors';

export default function Servicios() {
  return (
    <>
      <ScrollView>
        <View style={{ backgroundColor: 'white' }}>
          <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
            <Text style={styles.banner}>Barber House SV</Text>
          </View>

          <View style={styles.contenedor}>
            <Text style={styles.titulo}>Tipos de corte de cabello</Text>
            <ScrollView horizontal>
              <View>
                <Image
                  source={{
                    uri:
                      'https://i.pinimg.com/474x/c9/fe/9d/c9fe9d53af74b42e9484647ff38a6cf2.jpg',
                  }}
                  style={styles.corte}
                />
              </View>
              <View>
                <Image
                  source={{
                    uri:
                      'https://cortesdecabellohombre.com/wp-content/uploads/2017/11/Comb-Over-Corte.jpg',
                  }}
                  style={styles.corte}
                />
              </View>
              <View></View>
              <View>
                <Image
                  source={{
                    uri:
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRial32lHegMLkf1C1Y9nJ0cVNgwB9SLxvnJA&usqp=CAU',
                  }}
                  style={styles.corte}
                />
              </View>
              <View>
                <Image
                  source={{
                    uri:
                      'https://www.mispeinados.com/wp-content/uploads/2018/06/cortes-cabello-corto-para-pelo-rebelde-3.jpg',
                  }}
                  style={styles.corte}
                />
              </View>
            </ScrollView>
          </View>

          <View style={styles.contenedor}>
            <Text style={styles.titulo}>Tipos de estilos en barbas</Text>
            <ScrollView horizontal>
              <View>
                <Image
                  source={{
                    uri:
                      'https://i.pinimg.com/236x/bf/71/ab/bf71abcc025fe6229405db631b94a0f8.jpg',
                  }}
                  style={styles.corte}
                />
              </View>
              <View>
                <Image
                  source={{
                    uri:
                      'https://aceitesparacuidadodelcabello.com/wp-content/uploads/2020/04/el-estilo-de-barba-hollywoodiense-como-crecer-guia-ejemplos-y-mas-1024x1024.jpg',
                  }}
                  style={styles.corte}
                />
              </View>
              <View>
                <Image
                  source={{
                    uri:
                      'https://i.pinimg.com/236x/bf/71/ab/bf71abcc025fe6229405db631b94a0f8.jpg',
                  }}
                  style={styles.corte}
                />
              </View>
              <View>
                <Image
                  source={{
                    uri: 'http://www.aldia.co/sites/default/files/1_1.jpg',
                  }}
                  style={styles.corte}
                />
              </View>
            </ScrollView>
          </View>

          <Text style={styles.titulo}>Nuestros servicios</Text>
          <View style={styles.listado}>
            <View style={styles.listaItem}>
              <Text style={styles.letra}>Corte de cabello hombre</Text>
              <Image
                source={{
                  uri:
                    'https://hairdresserservicenewlook.es/wp-content/uploads/2018/06/corte-de-cabello-para-hombres.jpg',
                }}
                style={styles.barba}
              />
            </View>
            <View style={styles.listaItem}>
              <Text style={styles.letra}>Corte de cabello niños</Text>
              <Image
                source={{
                  uri:
                    'https://st4.depositphotos.com/1001959/20996/i/600/depositphotos_209969266-stock-photo-cute-preschooler-boy-getting-haircut.jpg',
                }}
                style={styles.barba}
              />
            </View>
            <View style={styles.listaItem}>
              <Text style={styles.letra}>Afeitado de barba</Text>
              <Image
                source={{
                  uri:
                    'https://st4.depositphotos.com/22732030/i/600/depositphotos_272660502-stock-photo-barber-shaves-beard-client-man.jpg',
                }}
                style={styles.barba}
              />
            </View>
            <View style={styles.listaItem}>
              <Text style={styles.letra}>Corte de barba</Text>
              <Image
                source={{
                  uri:
                    'https://i.pinimg.com/originals/e1/27/a8/e127a83873ffb551ecd176f879fbcdfc.jpg',
                }}
                style={styles.barba}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 100,
    flex: 1,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 10,
  },
  letra: {
    fontSize: 15,
    marginVertical: 10,
  },
  contenedor: {
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
  corte: {
    width: 250,
    height: 300,
    marginRight: 10,
  },
  barba: {
    width: '100%',
    height: 200,
    marginVertical: 5,
  },
  listaItem: {
    flexBasis: '49%',
  },
  listado: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },

  subtitulo: {
    fontWeight: 'bold',
    fontSize: 14,
    justifyContent: 'center',
  },
});
