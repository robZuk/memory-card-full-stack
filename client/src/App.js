import React from 'react';
import Button from './components/atoms/Button/Button';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Memory Cards</h1>
      <Button small>Add New Card</Button>
      <Button small>Delete Card</Button>
      <Button>Clear Cards</Button>
    </div>
  );
}

export default App;
