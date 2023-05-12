import React from 'react'
// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgme1HdKUZL_1mZk5XuxnBYivx1ynT6v4",
  authDomain: "tourapp-d8ea8.firebaseapp.com",
  databaseURL: "https://tourapp-d8ea8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tourapp-d8ea8",
  storageBucket: "tourapp-d8ea8.appspot.com",
  messagingSenderId: "985937528918",
  appId: "1:985937528918:web:a948c612e315b92b8c93f7",
  measurementId: "G-GQB752ZL9D"
};
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {firebase}; 