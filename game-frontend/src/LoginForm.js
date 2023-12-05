import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';

function LoginForm({ LoginEvent }) {
  const firebaseConfig = {
	apiKey: "AIzaSyAq_bnaOcLpo7O4zflkOGDMKuSrPalfM_k",
	authDomain: "bookstore-login-1eea9.firebaseapp.com",
	projectId: "bookstore-login-1eea9",
	storageBucket: "bookstore-login-1eea9.appspot.com",
	messagingSenderId: "354232646751",
	appId: "1:354232646751:web:f42cd9b05075f9e942afea",
	measurementId: "G-81E46GP6HN"
  };

  initializeApp(firebaseConfig);

  const [loggedUser, setLoggedUser] = useState('');

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithRedirect(auth, provider)
      .then((result) => {
        console.log(result.user);
        setLoggedUser(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logoutGoogle = () => {
    const auth = getAuth();
    auth.signOut();
    setLoggedUser(null);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in:", user);
        setLoggedUser(user);
      } else {
        console.log("No user is signed in.");
      }
      LoginEvent(user);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [LoginEvent]);

  return (
    <div>
      {loggedUser ? (
        <>
          <p>User: {loggedUser.uid}</p>
          <button onClick={logoutGoogle}>Log out</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
}

export default LoginForm;