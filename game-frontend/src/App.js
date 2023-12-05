import React, { useState, useEffect } from 'react';
import Login from "./Login";
import Game from './Game';
import Ranking from './Ranking';
import GameId from './GameId';
import { Navigate, BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import  axios from 'axios';

// Firebase configuration object
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

function App() {
  // Initializing Firebase authentication
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const[loadingGameId,setLoadingGameId] = useState(true);
  const[gameId,setGameId] = useState("");

  // Function to get the game ID for a specific user
  function getGameId(userId){
    axios.get(`https://guessgame-backend.uw.r.appspot.com/findGameIdByUserId?userId=${userId}`)
    .then(response => {
      console.log(response.data);
      setGameId(response.data);
      setLoadingGameId(false);
    })
    .catch(error => {
      console.log(error);
      setLoadingGameId(false);
    });
  }

  // If user information is still loading, display a message
  if(loading){
    return (<div>
      <p>Initialising User...</p>
    </div>);
  }
  // If there's an authentication error, display an error message
  if(error){
    return (<div>
      <p>auth errorr...</p>
    </div>);
  }
  console.log("user:", user);

  // Get the game ID for the current user
  getGameId(user);
  if (loadingGameId) {
  return (<div>
    <p>Loading Game Id...</p>
  </div>);
  }

   console.log("gameId", gameId);

  return (
      <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/gameId" /> : <Login />}
        />
        <Route
          path="/"
          element={user ? <Game /> : <Navigate to="/login" />}
        />
        <Route
          path="/ranking"
          element={<Ranking gameId = {gameId}/>}
        />
        <Route
        path = "/gameId"
        element={<GameId initialGameId={gameId}/>}
        />
      </Routes>
      </Router>
  );
}

export default App;