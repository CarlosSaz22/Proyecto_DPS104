import React, { useState, useEffect } from 'react';
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

import { AntDesign } from '@expo/vector-icons';
import { ListItem, Icon, Card } from 'react-native-elements';
import PagerView from 'react-native-pager-view';
import { DataTable, Button } from 'react-native-paper';
import Dia from './dia';
import color from '../utils/colors';
import Dots from 'react-native-dots-pagination';
import firebase from '../Conexion/database';
export default function Calendario(props) {
  const { navigation} = props;
  const [active, setActive] = useState(0);
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

//console.log('FUNCTION');
  }

  const onPageScroll = (event) => { 
    const { position } = event.nativeEvent; 
    if (position !== active) { 
      setActive(position);
    }
  };

 
const [cant, setCant] = useState('');

const calcular = async () => {
     
      const db = firebase.firestore();
      const resRef = db.collection('reservaciones');
      const snapshot = await resRef.get();
      const res = new Array();
 

 if (snapshot.empty) {
      //  console.log('SIN REGISTROS'); 
         setCant(0);

      } else {
      
        snapshot.forEach(doc => {
       
          res.push(doc.data());
        });

        setCant(res.length);
      }
    }

useEffect(() => {

  //console.log("USE EFFECT DE CALENDARIO");

    calcular();

  }, [{navigation}]); 

  const ref = React.useRef(PagerView); 
 // const MyPager = () => {
    return (
      <>
     
      <SafeAreaView style={styles.pagerView}>
       
        <StatusBar backgroundColor={color.BLUE} translucent={true} />
        <PagerView
          style={styles.pagerView}
          initialPage={0}
          onPageScroll={onPageScroll}
          ref={ref}>
          <Dia fecha={listaDeFecha[1]} activar={cant} />
          <Dia fecha={listaDeFecha[2]} activar={cant}/>
          <Dia fecha={listaDeFecha[3]} activar={cant}/>
          <Dia fecha={listaDeFecha[4]} activar={cant}/>
          <Dia fecha={listaDeFecha[5]} activar={cant}/>
        </PagerView>
        <Dots length={5} active={active} />
      </SafeAreaView>
      </>
    );
 // };
 // return MyPager();
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  banner: {
    height: 250,
    flex: 1,
  },
});
