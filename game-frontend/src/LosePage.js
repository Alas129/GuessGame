import React from 'react';
import { useLocation } from 'react-router-dom';
import './LosePage.css';

const LosePage = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const score = queryParams.get('score');

  return (
    <div className="lose-container">
      <h2>Game Over! You Lose!</h2>
      <p>Your Score: {score}</p>
    </div>
  );
};

export default LosePage;
