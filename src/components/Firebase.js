import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBtUZvhnKxgufA6YDu7iN87teScpX04gKE",
  authDomain: "react-auth-2-744cc.firebaseapp.com",
  projectId: "react-auth-2-744cc",
  storageBucket: "react-auth-2-744cc.appspot.com",
  messagingSenderId: "414683433797",
  appId: "1:414683433797:web:ea05da4d0879c78a5f8c2c"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth