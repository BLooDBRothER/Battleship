import React, { useState, useEffect } from 'react';
import { Game_Board } from '../../game_logic/Game_Board';
import Board from './Board';
import Ships from './Ships';

export const playerData = Game_Board();

const Game = () => {
  const [playerBoard, setPlayerBoard] = useState([]);
  useEffect(() => {
    setPlayerBoard(playerData.getGameBoard());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(playerBoard);
  }, [playerBoard])

  return (
    <div className='game'>
        <Board playerBoard={playerBoard} setPlayerBoard={setPlayerBoard}/>
        <Ships />
    </div>
  );
};

export default Game;
