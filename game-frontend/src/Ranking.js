import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import GameId from './GameId';

function Ranking({ gameId }) {
  const [games, setGames] = useState([]);
  const [userGames, setUserGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();

  const displayAllGames = () => {
    axios.get('https://guessgame-backend.uw.r.appspot.com/findAllGames')
      .then(response => {
        setGames(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  const displayGamesByUserId = () => {
    axios.get(`https://guessgame-backend.uw.r.appspot.com/findGameByUserId?userId=${auth.currentUser.email}`)
      .then(response => {
        setUserGames(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handlePlayGame = () => {
    window.location.href = '/';
  };

  const handleDelete = (id) => {
    axios.get(`https://guessgame-backend.uw.r.appspot.com/deleteGameById?id=${id}`)
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    displayAllGames();
    displayGamesByUserId();
  }, []);

  return (
    <div className="game-list">
      <div className="all-game-list">
        <div className="game-list-header">
          <h1>All Users</h1>
          <h1>Top 10 game records</h1>
        </div>
        {games.map(game => (
          <div className="game-item" key={game.id}>
            <p>{game.userId} score: {game.score} at {game.date}</p>
          </div>
        ))}
      </div>
      <div className="user-game-list">
        <div className="game-list-header">
          <h1>{auth.currentUser.email}</h1>
          <h1>All game records</h1>
        </div>
        {userGames.map(userGame => (
          <div className="game-item" key={userGame.id}>
            <p>{userGame.userId} score: {userGame.score} at {userGame.date}</p>
            <button className="delete-button" onClick={() => handleDelete(userGame.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        <button className="play-game-button" onClick={handlePlayGame}>Play Game</button>
        <p className="show-game-id">currentGameId: {gameId}</p>
      </div>
    </div>
  );
}

export default Ranking;