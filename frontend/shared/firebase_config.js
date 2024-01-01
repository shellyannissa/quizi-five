import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyBQio0CB2H7JTyvZh7LG367cEZLozMHpO8",
//   authDomain: "nitc-permission-system.firebaseapp.com",
//   projectId: "nitc-permission-system",
//   storageBucket: "nitc-permission-system.appspot.com",
//   messagingSenderId: "411708097549",
//   appId: "1:411708097549:web:5e605671a3d9eb59c14144",
//   measurementId: "G-P28NX4Y52Y",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCY7v8bHzt6qvcZzp2g0hAeR-XJf0RejZg",
  authDomain: "chat-app-4d401.firebaseapp.com",
  projectId: "chat-app-4d401",
  storageBucket: "chat-app-4d401.appspot.com",
  messagingSenderId: "208186499870",
  appId: "1:208186499870:web:dfa85d667aa0cdcae6df0f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const storage = getDatabase(app);
export const db = getDatabase(app);
