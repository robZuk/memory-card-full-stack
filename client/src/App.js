import React from 'react';
import Button from './components/atoms/Button/Button';
import Header from './components/molecules/Header/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Button small>Delete Card</Button>
      <Button>Clear Cards</Button>
    </div>
  );
}

export default App;
