import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { ListItem, Icon, Card } from 'react-native-elements';
import PagerView from 'react-native-pager-view';
import { DataTable, Button } from 'react-native-paper';
import Dia from './dia';
import color from '../utils/colors';
export default function Calendario(props) {
  const { navigation } = props;

  const listaDeFecha = [];

  diaActual();

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function diaActual() {
    const hoy = new Date();

    var i;
    for (i = 0; i <= 5; i++) {
      listaDeFecha[i] = addDays(hoy, i);
    }
  }

  const MyPager = () => {
    return (
      <SafeAreaView style={styles.pagerView}>
        <StatusBar backgroundColor={color.BLUE} translucent={true} />

        <PagerView style={styles.pagerView} initialPage={0}>
     
          <Dia fecha={listaDeFecha[1]} />
          <Dia fecha={listaDeFecha[2]} />
          <Dia fecha={listaDeFecha[3]} />
          <Dia fecha={listaDeFecha[4]} />
          <Dia fecha={listaDeFecha[5]} />
        </PagerView>
      </SafeAreaView>
    );
  };
  return MyPager();
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});
