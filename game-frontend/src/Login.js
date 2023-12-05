import React, { useState, useEffect } from 'react';
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import logo from './logo.svg';
import './App.css';

// Define the Login component
function Login() {
  const [userId, setUserId] = useState('');

  // Function to sign in with Google using Firebase authentication
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    // Redirect the user to Google sign-in
    signInWithRedirect(auth, provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Get the authentication instance from Firebase
  const auth = getAuth();

  // Listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If a user is signed in, log the user information and set the user ID in state
        console.log("User is signed in:", user);
        setUserId(user.uid);
      } else {
        console.log("No user is signed in.");
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  // Render the Login component
  return (
    <div>
      {/* Button to trigger Google sign-in */}
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      
      {/* Display the user ID */}
      <p>{userId}</p>
    </div>
  );
}

// Export the Login component as the default export
export default Login;