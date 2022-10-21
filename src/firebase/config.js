import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0oQ-VGPqsvVbO96jZvLBQD_sEg2OKIO4",
  authDomain: "todo-app-8a284.firebaseapp.com",
  projectId: "todo-app-8a284",
  storageBucket: "todo-app-8a284.appspot.com",
  messagingSenderId: "1090843493927",
  appId: "1:1090843493927:web:c7632a314888046e11b002"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);