// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDJKOSpSFSGgv5SRmf7zRL2b2wpEsgATwU',
  authDomain: 'reactfirebaseauthroles.firebaseapp.com',
  projectId: 'reactfirebaseauthroles',
  storageBucket: 'reactfirebaseauthroles.appspot.com',
  messagingSenderId: '901747216114',
  appId: '1:901747216114:web:0de299207ddaf5c7904a6b',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
