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
  apiKey: `${process.env.API_KEY}`,
  authDomain: "tourapp-d8ea8.firebaseapp.com",
  databaseURL: `${process.env.DATABASE_URL}`,
  projectId: "tourapp-d8ea8",
  storageBucket: "tourapp-d8ea8.appspot.com",
  messagingSenderId: `${process.env.MESSAGING_SENDERID}`,
  appId: `${process.env.APP_ID}`,
  measurementId: `${process.env.MEASUREMENT_ID}`
};
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {firebase}; 