import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBQio0CB2H7JTyvZh7LG367cEZLozMHpO8",
  authDomain: "nitc-permission-system.firebaseapp.com",
  projectId: "nitc-permission-system",
  storageBucket: "nitc-permission-system.appspot.com",
  messagingSenderId: "411708097549",
  appId: "1:411708097549:web:5e605671a3d9eb59c14144",
  measurementId: "G-P28NX4Y52Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
