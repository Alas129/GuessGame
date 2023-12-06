import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCRcAl2AScYe98nxTeEE-9rCVNe_ExnP1Y",
    authDomain: "guessgame-c8eaf.firebaseapp.com",
    projectId: "guessgame-c8eaf",
    storageBucket: "guessgame-c8eaf.appspot.com",
    messagingSenderId: "1045512623760",
    appId: "1:1045512623760:web:37c29461b53e0005a32a15",
    measurementId: "G-4F0SRDMRCN"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const googleAuthProvider = new GoogleAuthProvider();
  
  export { auth, googleAuthProvider };