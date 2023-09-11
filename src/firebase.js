import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfHwROmxtYmiV2AEVEh2zhw-Pmc7fBvT8",
  authDomain: "cimadowndemo.firebaseapp.com",
  projectId: "cimadowndemo",
  storageBucket: "cimadowndemo.appspot.com",
  messagingSenderId: "76577808138",
  appId: "1:76577808138:web:c30eace30c35f38e97a4f3",
  measurementId: "G-P11J0RK96F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
 