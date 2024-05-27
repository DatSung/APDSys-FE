// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEUStHBfNSksXuunyHIrQlT81vGqG4-Sg",
  authDomain: "dssys-storage.firebaseapp.com",
  projectId: "dssys-storage",
  storageBucket: "dssys-storage.appspot.com",
  messagingSenderId: "601832657034",
  appId: "1:601832657034:web:bc6f3d03be9f70881b9d73",
  measurementId: "G-5EC3BBMKVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;
