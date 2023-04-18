// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDZNwGqhJFqrIVTxyjdwwI7ODbhfSqoiNE",
  authDomain: "cloneapp-mansi.firebaseapp.com",
  projectId: "cloneapp-mansi",
  storageBucket: "cloneapp-mansi.appspot.com",
  messagingSenderId: "864103757552",
  appId: "1:864103757552:web:efe49fec92223f549bf435",
  measurementId: "G-NNZWB2SESS"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };