// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGC-DqhLUNyOeXyiAupTC5CYiWAhE1gQ0",
  authDomain: "sec-dash.firebaseapp.com",
  projectId: "sec-dash",
  storageBucket: "sec-dash.appspot.com",
  messagingSenderId: "565595020981",
  appId: "1:565595020981:web:1dd9001b5b92778f27a8fc",
};

// Initialize Firebase
const Firebase = initializeApp(firebaseConfig);

export default Firebase;
