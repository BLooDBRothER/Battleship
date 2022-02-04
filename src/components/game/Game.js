import React, { useState, useEffect, useReducer } from 'react';
import Board from './Board';
import { playerData, reducer } from './reducer';
import Ships from './Ships';


export const gameDataContext = React.createContext(null);

const Game = () => {
  const [gameData, dispatch] = useReducer(reducer, {
    board: {
      player: playerData.getGameBoard(),
    },
    shipData:{
      player: playerData.getShipData(),
    } 
  });
  useEffect(() => {
    console.log(gameData)
    // setPlayerBoard(playerData.getGameBoard());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    
    <gameDataContext.Provider value={[gameData, dispatch]}>
      <div className='game'>
          <Board />
          <Ships />
      </div>
    </gameDataContext.Provider>
  );
};

export default Game;
