import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyASmmNwAi-rRhOXHlfjqxpR4NbP_6K98-8",
  authDomain: "phoenix-js.firebaseapp.com",
  projectId: "phoenix-js",
  storageBucket: "phoenix-js.appspot.com",
  messagingSenderId: "458916965739",
  appId: "1:458916965739:web:e99802f80f9486e1f3f02e",
  measurementId: "G-QWVD2Z5E31",
  databaseURL: "https://phoenix-js-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
