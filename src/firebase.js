//At the top
import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeOBVxfwmpVSeKe8vuVrEFNBHxklElxRQ",
  authDomain: "first-project-b978d.firebaseapp.com",
  projectId: "first-project-b978d",
  storageBucket: "first-project-b978d.appspot.com",
  messagingSenderId: "912450166331",
  appId: "1:912450166331:web:7a4dcdc4b43ce7a74c861e",
  measurementId: "G-1EZQGV41RK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Below the import code
const db = getFirestore(app);
export default db