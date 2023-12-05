import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WheelOfFortune from './WheelOfFortune';
import WinPage from './WinPage';
import LosePage from './LosePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/win" element={<WinPage />} />
        <Route path="/lose" element={<LosePage />} />
        <Route path="/" element={<WheelOfFortune />} />
      </Routes>
    </Router>
  );
};

export default App;
