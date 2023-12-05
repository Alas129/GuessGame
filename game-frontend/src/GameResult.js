import React from 'react';

const GameResult = ({ result, score }) => {
  return (
    <div>
      {result === 'win' ? (
        <h2>Congratulations! You Win!</h2>
      ) : (
        <h2>Game Over! You Lose!</h2>
      )}
      <p>Score: {score}</p>
    </div>
  );
};

export default GameResult;
