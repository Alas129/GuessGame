import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

function GameId({ initialGameId }) {
  const auth = getAuth();
  const [gameId, setGameId] = useState(initialGameId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePlayGame = () => {
    window.location.href = '/';
  };

  const handleCreateGameId = async (event) => {
    event.preventDefault();

    // Input validation example: Check if gameId is not empty
    if (!gameId.trim()) {
      alert('Please enter a valid GameId');
      return;
    }

    const postData = {
      userId: auth.currentUser.email,
      gameId,
    };

    setLoading(true);

    try {
      const response = await axios.post('https://guessgame-backend.uw.r.appspot.com/saveUser', postData);
      console.log('Response:', response.data);
      alert('Save successful');
    } catch (error) {
      console.error('Error posting data:', error);
      setError('Save failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-game-id">
      <form onSubmit={handleCreateGameId}>
        <label>
          GameId:
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Submit'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handlePlayGame} disabled={loading}>
        Play Game
      </button>
    </div>
  );
}

export default GameId;