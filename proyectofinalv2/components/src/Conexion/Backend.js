import firebase from 'firebase';

import 'firebase/firestore';

export async function getUsuarios() {
  var db = firebase.firestore();
  var referencia = db.collection('reservaciones');

  const listaUsuario = new Array();
  await referencia
    .get()
    .then((response) => {
      if (response.size > 0) {
        response.forEach((usuario) => {
          listaUsuario.push(usuario.data());
        });
        console.log('si llego');
      } else {
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Fallo la llamada:', error);
    });
  console.log(listaUsuario);
  return listaUsuario;
}

export async function postUsuario(id, nombre, apellido, apodo, dia, time) {
  console.log('si llego');

  var db = firebase.firestore();
  var referencia = db.collection('reservaciones');
  referencia
    .add({
      id: id,
      nombres: nombre,
      apellidos: apellido,
      usuario: apodo,
      fecha: dia,
      hora: time,
    })
    .then(() => {
      console.log('Guardado exitosamente!');
    })
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
}