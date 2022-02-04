import React, { useEffect, useReducer } from 'react';
import Menu from '../menu/Menu';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    
    <gameDataContext.Provider value={[gameData, dispatch]}>
      <div className='game'>
          <Menu />
          <Board />
          <Ships />
      </div>
    </gameDataContext.Provider>
  );
};

export default Game;
