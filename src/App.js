import './App.css';
import { Route, Routes } from 'react-router';
import React from 'react';
import IntroScreen from './Components/intro';
import Portfolio from './Components/portfolio';

function App() {
  return (
    <Routes>
      <Route path="/" element = {<IntroScreen />}/>
      <Route path="/portfolio/*" element = {<Portfolio />} />
    </Routes>
  );
}

export default App;
