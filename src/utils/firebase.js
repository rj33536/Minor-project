import firebase from 'firebase';
import 'firebase/auth';
// Initialize Firebase
export const app = firebase.initializeApp({
    apiKey: "AIzaSyAg9wWi7OccQPxDYWWKIeNMdcOvds-3_iE",
    authDomain: "workout-clock.firebaseapp.com",
    databaseURL: "https://workout-clock.firebaseio.com",
    projectId: "workout-clock",
    storageBucket: "workout-clock.appspot.com",
    messagingSenderId: "563160271644",
    appId: "1:563160271644:web:c939c10fd327bd27d508d9"
});