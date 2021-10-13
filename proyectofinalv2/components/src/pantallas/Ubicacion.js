import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
export default function WebScreen({ route, navigation }) {
  const url =
    'https://www.google.com/maps/place/Barber+House+SV/@13.7053364,-89.2602306,15z/data=!4m9!1m2!2m1!1sbarber+sv!3m5!1s0x8f632ff476b958d3:0x974622fb6343a5c!8m2!3d13.7053405!4d-89.2514754!15sCgliYXJiZXIgc3aSAQtiYXJiZXJfc2hvcA';
  return <WebView style={styles.webSize} source={{ uri: url }}></WebView>;
}
const styles = StyleSheet.create({
  webSize: {
    width: '100%',
    height: '100%',
  },
});
