import React, { useEffect, useReducer } from 'react';
import Menu from '../menu/Menu';
import Board from './Board';
import { player_1_Data, player_2_Data, reducer } from './reducer';
import Ships from './Ships';


export const gameDataContext = React.createContext(null);

const Game = () => {
  const [gameData, dispatch] = useReducer(reducer, {
    board: {
      player_1: player_1_Data.getGameBoard(),
      player_2: player_2_Data.getGameBoard()
    },
    shipData:{
      player_1: player_1_Data.getShipData(),
      player_2: player_2_Data.getShipData(),
    },
    isGameStarted: false,  
  });

  useEffect(() => {
    console.log(gameData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    
    <gameDataContext.Provider value={[gameData, dispatch]}>
      <div className='game' data-status={gameData.isGameStarted}>
          {!gameData.isGameStarted && <Menu />}
          <Board isOwner={true} />
          {!gameData.isGameStarted && <Ships />}
          {gameData.isGameStarted && <Board isOwner={false} />}

      </div>
    </gameDataContext.Provider>
  );
};

export default Game;
