const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  apiKey: process.env.robowarsApiKey,
  authDomain: process.env.robowarsAuthDomain,
  projectId: process.env.robowarsProjectId,
  storageBucket: process.env.robowarsStorageBucket,
  messagingSenderId: process.env.robowarsMessagingSenderId,
  appId: process.env.robowarsAppId,
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

module.exports = db;
