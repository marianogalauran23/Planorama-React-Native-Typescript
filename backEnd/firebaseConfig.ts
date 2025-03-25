import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    initializeAuth, 
    setPersistence, 
    browserLocalPersistence 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeXrRBiBzEM5DmtSDVZ3FTojKO443h4RQ",
  authDomain: "tcu-planorama.firebaseapp.com",
  databaseURL: "https://tcu-planorama-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tcu-planorama",
  storageBucket: "tcu-planorama.firebasestorage.app",
  messagingSenderId: "164200453353",
  appId: "1:164200453353:web:25c3bb8cfafb0f8cf98c78",
  measurementId: "G-MTBVVEVN87"
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Auth
const auth = initializeAuth(app);

// ✅ Set persistence to store session
setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("Firebase Auth Persistence Enabled!");
    })
    .catch((error) => {
        console.error("Error enabling persistence:", error);
    });

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
