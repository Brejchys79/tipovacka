import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);   // <- změna názvu z "database" na "db"
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, db, auth, analytics };  // <- exportujeme db místo database
