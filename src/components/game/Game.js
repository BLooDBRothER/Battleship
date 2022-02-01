import React from 'react';
import Board from './Board';
import Ships from './Ships';

const Game = () => {
  return (
    <div className='game'>
        <Board />
        <Ships />
    </div>
  );
};

export default Game;
