// Firebase init
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAKs0rNk-TCwXipMoeASe90bq3Cl9zKFnU",
    authDomain: "tipovacka-c1a1b.firebaseapp.com",
    databaseURL: "https://tipovacka-c1a1b-default-rtdb.firebaseio.com",
    projectId: "tipovacka-c1a1b",
    storageBucket: "tipovacka-c1a1b.appspot.com",
    messagingSenderId: "841726766663",
    appId: "1:841726766663:web:295099985d8af6e31d8b62"
  };

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)
