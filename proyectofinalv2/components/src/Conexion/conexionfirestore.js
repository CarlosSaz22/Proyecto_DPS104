import { firebase } from '@firebase/app';
import '@firebase/firestore';

if (firebase.apps.length === 0) {
  const firebaseConfig = {
    apiKey: 'AIzaSyBoQocxQIMIr7OYq-R6stCctNKKapno6xc',
    authDomain: 'barbersv-b8fac.firebaseapp.com',
    projectId: 'barbersv-b8fac',
    storageBucket: 'barbersv-b8fac.appspot.com',
    messagingSenderId: '589552068551',
    appId: '1:589552068551:web:3b9ebdf7abe5764fb9dbe2',
    measurementId: 'G-7LN58T7M8K',
  };
  // Initialize Firebase
  const Firebase = firebase.initializeApp(firebaseConfig);
}

export default firebase;
