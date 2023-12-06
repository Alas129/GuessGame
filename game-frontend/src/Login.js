import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from 'firebase/auth';

const Login = ({ LoginEvent }) => {
  const [loggedUser, setLoggedUser] = useState('');

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider);
  };

  const logoutGoogle = () => {
    const auth = getAuth();
    auth.signOut();
    setLoggedUser(null);
  };

  useEffect(() => {
    const auth = getAuth();
    const fetchData = async () => {
      try {
        const result = await getRedirectResult(auth);
        const user = result.user;
        if (user) {
          console.log('User is signed in:', user);
          setLoggedUser(user);
        }
      } catch (error) {
        console.error('Error handling Google redirect:', error.message);
      }
    };

    fetchData();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
        setLoggedUser(user);
      } else {
        console.log('No user is signed in.');
      }
      LoginEvent(user);
    });

    return () => unsubscribe();
  }, [LoginEvent]);

  return (
    <div>
      {loggedUser ? (
        <>
          <p>user: {loggedUser.uid}</p>
          <button onClick={logoutGoogle}>Log out</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Login;
