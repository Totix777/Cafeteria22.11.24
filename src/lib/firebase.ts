import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCmPYgwPWgETKMv0QrxqnOLdNZlKCIpJiU",
  authDomain: "cafeteria-haccp.firebaseapp.com",
  projectId: "cafeteria-haccp",
  storageBucket: "cafeteria-haccp.firebasestorage.app",
  messagingSenderId: "152803499883",
  appId: "1:152803499883:web:1c89972485ae65f064362e",
  measurementId: "G-QRKC65TSMD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);