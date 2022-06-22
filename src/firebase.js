// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
   apiKey: "AIzaSyA7zyTXBrzc4TEhUw9LJi3QcOUNCut0IYQ",
   authDomain: "lifegoalsapp-63473.firebaseapp.com",
   databaseURL: "https://lifegoalsapp-63473-default-rtdb.firebaseio.com",
   projectId: "lifegoalsapp-63473",
   storageBucket: "lifegoalsapp-63473.appspot.com",
   messagingSenderId: "559206728231",
   appId: "1:559206728231:web:5e3dea538593e864278402"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;