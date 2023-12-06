import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import React, {  useState, useEffect } from 'react';

function LoginForm() {
    const firebaseConfig = {
        apiKey: "AIzaSyCRcAl2AScYe98nxTeEE-9rCVNe_ExnP1Y",
        authDomain: "guessgame-c8eaf.firebaseapp.com",
        projectId: "guessgame-c8eaf",
        storageBucket: "guessgame-c8eaf.appspot.com",
        messagingSenderId: "1045512623760",
        appId: "1:1045512623760:web:37c29461b53e0005a32a15",
        measurementId: "G-4F0SRDMRCN"
      };

	initializeApp(firebaseConfig);
	
	const [loggedUser, setLoggedUser] = useState('');

	const signInWithGoogle = () => {
  	
  		const provider = new GoogleAuthProvider();
  		const auth = getAuth();
  		signInWithRedirect(auth, provider)
    	.then((result) => {
      		console.log(result.user);
      		setLoggedUser(result.user)
      	
    	}).catch((error) => {
      		console.error(error);
    	});
	};
	
	function logoutGoogle () {
		const auth=getAuth();
		auth.signOut();
		setLoggedUser(null)
	}

	useEffect(() => {
		const auth = getAuth();
		auth.onAuthStateChanged(user => {
			if (user) {
    			console.log("User is signed in:", user);
    			setLoggedUser(user);
    		
  			} else {
    			console.log("No user is signed in.");
  			}
  			// LoginEvent(user);
  		});
	}, []);
	return (
    <div >
        { loggedUser? (
            <>
                <p>user: {loggedUser.email}</p> 
                <button onClick={logoutGoogle}>Log out</button> 
            </>
        ):(
            <button onClick={signInWithGoogle}>Sign in with Google</button>)
        } 
    </div>
  );

}
export default LoginForm;