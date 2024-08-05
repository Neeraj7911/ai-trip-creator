// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWevJ4Tr5oa8qQHk4-tee7CKvu6089uc0",
  authDomain: "ai-trip-creator-16921.firebaseapp.com",
  projectId: "ai-trip-creator-16921",
  storageBucket: "ai-trip-creator-16921.appspot.com",
  messagingSenderId: "689671348629",
  appId: "1:689671348629:web:c8073ea3c37f3eb1b7969c",
  measurementId: "G-N4FD7R1EFC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
