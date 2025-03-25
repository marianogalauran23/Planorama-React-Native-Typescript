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
//e Firebase app
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
