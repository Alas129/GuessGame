import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm'; // Import the login component
import './WheelOfFortune.css'; // CSS styles

const WheelOfFortune = () => {
  const navigate = useNavigate();

  const [phrase, setPhrase] = useState('');
  const [hiddenPhrase, setHiddenPhrase] = useState('');
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [totalGuessCount, setTotalGuessCount] = useState(0);
  const [wrongGuessCount, setWrongGuessCount] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [phraseInput, setPhraseInput] = useState('');
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

    // // Guess entire phrases section
    // const handlePhraseInput = (event) => {
    //     setPhraseInput(event.target.value.toUpperCase());
    // };

    // const submitUserPhrase = () => {
    //     const cleanedInput = phraseInput.replace(/[^A-Z]/g, ''); // Remove non-alphabetic characters
    //     if (cleanedInput === phrase) {
    //         alert('Congratulations! You Win!!!');
    //         const newScore = calculateScore(totalGuessCount, wrongGuessCount);
    //         setScore(newScore);
    //         stopGame(true);
    //     } else {
    //         alert('Incorrect phrase. Try again.');
    //         setWrongGuessCount(wrongGuessCount + 1);
    //         setTotalGuessCount(totalGuessCount + 1);
    //     }
    //     setPhraseInput('');
    // };

  useEffect(() => {
    if (hiddenPhrase !== "" && !hiddenPhrase.includes('*')) {
      alert('Great guess. You Win!!!');
      const newScore = calculateScore(totalGuessCount, wrongGuessCount);
      setScore(newScore);
      stopGame(true);
    }
  }, [hiddenPhrase, totalGuessCount, wrongGuessCount]);

  useEffect(() => {
    const newScore = calculateScore(totalGuessCount, wrongGuessCount);
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

    const gameInfo = {
        "userId": "user003",
        "gameId": "pGame02",
        "score": score * 100
    };

    // Send a POST request to store game information on the server
    const response = axios.post('https://guessgame-backend.uw.r.appspot.com/saveGame', gameInfo)
       .then(response => {
            console.log(response); // This will show the full response object in the console
            return response.data; // This is the data returned from the server
        })
        .then(data => {
            console.log('Game information stored:', data);
        })
        .catch(error => {
            console.error('Error storing game information:', error);
        });
    // console.log('Game information stored:', response);


    if (isWin) {
      navigate(`/win?${new URLSearchParams(queryParams)}`);
    } else {
      navigate(`/lose?${new URLSearchParams(queryParams)}`);
    }
  };

  return (
    <div className="wheel-container">
      <h1>Wheel of Fortune Game</h1>

      {/* Display login component */}
      <LoginForm />
      
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
        {/* <div>
            <input
                type="text"
                value={phraseInput}
                onChange={handlePhraseInput}
                placeholder="Enter the entire phrase"
                id="phraseInput"
            />
            <button onClick={submitUserPhrase}>Submit Phrase</button>
        </div> */}
      </div>
    </div>
  );
};

export default WheelOfFortune;
