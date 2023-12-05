import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const phrases = ['this is a cat', 'good game', 'what a wonderful day'];
const maxGuessingTime = 5;

function generateHiddenPhrase(secretPhrases) {
  return secretPhrases.replace(/[a-zA-Z]/g, '*');
}

function Game() {
  const [hiddenPhrase, setHiddenPhrase] = useState(generateHiddenPhrase(phrases[0]));
  const [notice, setNotice] = useState('');
  const [guessLetter, setGuessLetter] = useState('');
  const [guessTime, setGuessTime] = useState(maxGuessingTime);
  const [previousGuess, setPreviousGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const auth = getAuth();

  useEffect(() => {
    if (gameOver) {
      saveGame();
    }
  }, [gameOver]);

  function handleChange(event) {
    setGuessLetter(event.target.value.toLowerCase());
  }

  function handleStartNewGame() {
    const newSecretIndex = Math.floor(Math.random() * phrases.length);
    const newSecret = phrases[newSecretIndex].toLowerCase();
    setHiddenPhrase(generateHiddenPhrase(newSecret));
    setNotice('');
    setGuessLetter('');
    setGuessTime(maxGuessingTime);
    setPreviousGuess('');
    setGameOver(false);
  }

  function handleShowRanking() {
    // Navigate to the ranking page
    window.location.href = '/ranking';
  }

  function checkGuess() {
    if (gameOver) {
      return;
    }

    const guessExists = secretPhrases.includes(guessLetter);

    let newHiddenPhrase = '';
    for (let i = 0; i < secretPhrases.length; i++) {
      const ch = secretPhrases.charAt(i);
      if (guessExists && guessLetter === ch) {
        newHiddenPhrase += guessLetter;
      } else if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
        newHiddenPhrase += hiddenPhrase.charAt(i);
      } else {
        newHiddenPhrase += ' ';
      }
    }

    setHiddenPhrase(newHiddenPhrase);

    if (newHiddenPhrase === secretPhrases) {
      setNotice('You won the game');
      setGameOver(true);
    } else {
      setNotice(guessExists ? 'This is a right guess' : 'This is a wrong guess');
    }

    setPreviousGuess(previousGuess + guessLetter);

    if (!guessExists) {
      setGuessTime((prevGuessTime) => prevGuessTime - 1);
      if (guessTime === 1) {
        setGameOver(true);
        setNotice('You lost the game');
      }
    }

    setGuessLetter('');
  }

  async function saveGame() {
    const postData = {
      userId: auth.currentUser.email,
      score: ((maxGuessingTime - guessTime) * 100) / maxGuessingTime,
    };

    try {
      const response = await axios.post('https://guessgame-backend.uw.r.appspot.com/saveGame', postData);
      console.log('Game saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving game:', error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="secretPhrases">
          <h1>The secret phrase for guessing is:</h1>
          <h2>{hiddenPhrase}</h2>
          <h3>{guessTime} times to guess!</h3>
        </div>
        <div className="userInput">
          <label>Guessing the phrase </label>
          <input type="text" maxLength={1} value={guessLetter} placeholder="letter" onChange={handleChange} />
          <button onClick={checkGuess} disabled={gameOver}>
            Submit
          </button>
        </div>
        <div>
          <h2>{notice}</h2>
          {gameOver && (
            <form>
              <label>Do you want to save this game record</label>
              <button onClick={saveGame}>Save Record</button>
              <button onClick={handleStartNewGame}>Not save</button>
            </form>
          )}
          <button onClick={handleShowRanking}>Show Ranking</button>
          <h2>Your previous guesses: {previousGuess}</h2>
        </div>
      </header>
    </div>
  );
}

export default Game;
