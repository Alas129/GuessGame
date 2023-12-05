import React from 'react';
import { useLocation } from 'react-router-dom';

// const WinPage = () => {
//   return (
//     <div>
//       <h1>Congratulations! You Win!</h1>
//       {/* You can add more content or styling as needed */}
//     </div>
//   );
// };

const WinPage = ({ score }) => {

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    score = queryParams.get('score');

    return (
        <div>
        <h2>Congratulations! You Win!</h2>
        <p>Your Score: {score}</p>
        </div>
    );
};

export default WinPage;
