import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const WinPage = ({ score }) => {

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    score = queryParams.get('score');

    // State to store game records
    const [gameRecords, setGameRecords] = useState([]);

    useEffect(() => {
        // Fetch game records from the GCP server
        axios.get('https://guessgame-backend.uw.r.appspot.com/findAllGames')
          .then(response => {
            console.log(response);
            setGameRecords(response.data);
          })
          .catch(error => {
            console.error('Error fetching game records:', error);
          });
    }, []); // Empty dependency array ensures that this effect runs only once on mount
    
    console.log("gameRecords: ", gameRecords)
    if (!Array.isArray(gameRecords) || gameRecords.length === 0) {
        console.log("Error Records: ", gameRecords)
        console.log(typeof(gameRecords))
        return <p>No game records found.</p>;
    }
    
    return (
        <div>
            <h2>Congratulations! You Win!</h2>
            <p>Your Score: {score}</p>

            {/* Display game records */}
            <h3>Game Records:</h3>
            <ul>
                {gameRecords.map(record => (
                <li key={record.id}>
                    {/* Display relevant information from game record */}
                    {record.date} - {record.userId}
                </li>
                ))}
            </ul>
        </div>
    );
};

export default WinPage;
