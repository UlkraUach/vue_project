import firebase from 'firebase/app'
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyBnKkEytJs7EioKTV_NAaXB--Urf9WPUY8",
    authDomain: "vue-todo-2021-2d41d.firebaseapp.com",
    projectId: "vue-todo-2021-2d41d",
    storageBucket: "vue-todo-2021-2d41d.appspot.com",
    messagingSenderId: "1004460869176",
    appId: "1:1004460869176:web:2e389c8f2682d49e3808cd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()