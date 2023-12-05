import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WheelOfFortune.css'; // CSS styles

const WheelOfFortune = () => {
  const navigate = useNavigate();

  const [phrase, setPhrase] = useState('');
  const [hiddenPhrase, setHiddenPhrase] = useState('');
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [totalGuessCount, setTotalGuessCount] = useState(0);
  const [wrongGuessCount, setWrongGuessCount] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const guessLimit = 7;

  const fetchRandomPhrase = () => {
    const phrases = ['Hello World', 'React is Fun', 'Wheel of Fortune'];
    const randomIndex = Math.floor(Math.random() * phrases.length);
    const randomPhrase = phrases[randomIndex].toUpperCase();
    setPhrase(randomPhrase);
    generateHiddenPhrase(randomPhrase);
  };

  useEffect(() => {
    // Fetch random phrase only when the component mounts
    if (phrase === '') {
      fetchRandomPhrase();
    }
  }, []);

  const generateHiddenPhrase = (phrase) => {
    const hidden = phrase.replace(/[A-Z]/g, '*');
    setHiddenPhrase(hidden);
  };

  const processGuess = (guess) => {

    setTotalGuessCount(totalGuessCount + 1);

    setPreviousGuesses([...previousGuesses, guess]);

    let correctGuessCount = 0;

    // console.log('guess:', guess)
    for (let i = 0; i < phrase.length; i++) {
      const targetCh = phrase[i];
      if (guess.toUpperCase() === targetCh) {
        setHiddenPhrase((prevHidden) => {
          const newHidden = [...prevHidden];
          newHidden[i] = targetCh;
          console.log("newHidden: ",newHidden)
          return newHidden.join('');
        });
        correctGuessCount += 1; 
      }
    }

    if (correctGuessCount === 0) {
      alert('Sorry, Do not have this letter in the phrase.');
      setWrongGuessCount(wrongGuessCount + 1);
    }

    if (wrongGuessCount >= guessLimit) {
        alert('Game over. You\'re exceeding the guess limit.');
        const newScore = calculateScore(totalGuessCount, wrongGuessCount);
        setScore(newScore);
        stopGame(false);
    }
  };

  useEffect(() => {
    console.log(hiddenPhrase);
    console.log(hiddenPhrase.includes('*'));

    if (hiddenPhrase !== "" && !hiddenPhrase.includes('*')) {
      alert('Great guess. You Win!!!');
      const newScore = calculateScore(totalGuessCount, wrongGuessCount);
      console.log("new score:", newScore);
      setScore(newScore);
      stopGame(true);
    }
  }, [hiddenPhrase, totalGuessCount, wrongGuessCount]);

  useEffect(() => {
    const newScore = calculateScore(totalGuessCount, wrongGuessCount);
    console.log("new score:", newScore);
    setScore(newScore);
  }, [hiddenPhrase]);

  const calculateScore = (totalGuesses, wrongGuesses) => {
    return totalGuesses - wrongGuesses;
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value.toUpperCase());
  };

  const submitUserGuess = () => {
    if (userInput.length === 1 && userInput.match(/[A-Z]/)) {
      processGuess(userInput);
    } else {
      alert('Please enter a valid single letter.');
    }
    setUserInput('');
  };

  const stopGame = (isWin) => {
    console.log("stop score:", score);
    // Navigate to a new page based on the game result
    const queryParams = { score };

    if (isWin) {
      navigate(`/win?${new URLSearchParams(queryParams)}`);
    } else {
      navigate(`/lose?${new URLSearchParams(queryParams)}`);
    }
  };

  return (
    <div className="wheel-container">
      <h1>Wheel of Fortune Game</h1>
      <div>
        <p>Hidden Phrase: {hiddenPhrase}</p>
        <p>Previous Guesses: {previousGuesses.join(', ')}</p>
        <p>Total Guess: {totalGuessCount}</p>
        <p>Correct Guess: {totalGuessCount - wrongGuessCount}</p>
        <p>Wrong Guess: {wrongGuessCount}</p>
        <p>Score: {score}</p>
        <div>
          <input
            type="text"
            maxLength="1"
            value={userInput}
            onChange={handleUserInput}
            placeholder="Enter a letter"
            id="letterInput"
          />
          <button onClick={submitUserGuess}>Guess</button>
        </div>
      </div>
    </div>
  );
};

export default WheelOfFortune;
