import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
export default function WebScreen({ route, navigation }) {
  const url =
    'https://www.google.com/maps/place/Barber+House+SV/@13.7053364,-89.2514759,15z/data=!4m2!3m1!1s0x0:0x974622fb6343a5c?sa=X&ved=2ahUKEwiWkpSjn-vzAhXcQTABHRzbD-wQ_BJ6BAg1EAU';
  return <WebView style={styles.webSize} source={{ uri: url }}></WebView>;
}
const styles = StyleSheet.create({
  webSize: {
    width: '100%',
    height: '100%',
  },
});
