// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Firebase konfigurace
const firebaseConfig = {
  apiKey: "AIzaSyAKs0rNk-TCwXipMoeASe90bq3Cl9zKFnU",
  authDomain: "tipovacka-c1a1b.firebaseapp.com",
  databaseURL: "https://tipovacka-c1a1b-default-rtdb.firebaseio.com",
  projectId: "tipovacka-c1a1b",
  storageBucket: "tipovacka-c1a1b.firebasestorage.app",
  messagingSenderId: "841726766663",
  appId: "1:841726766663:web:56905770a465caf01d8b62",
  measurementId: "G-EJY747TR53"
};

// Inicializace Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Export pro použití v React aplikaci
export { app, database, auth, analytics };
