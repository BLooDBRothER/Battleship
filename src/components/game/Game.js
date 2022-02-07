import React, { useEffect, useReducer } from 'react';
import { players } from '../../game_logic/Players';
import Menu from '../menu/Menu';
import OpponentBoard from './OpponentBoard';
import PlayerBoard from './PlayerBoard';
import { reducer } from './reducer';
import Ships from './Ships';


export const gameDataContext = React.createContext(null);

const Game = () => {
  const [gameData, dispatch] = useReducer(reducer, {
    board: players.player_1.getGameBoard(),
    shipData:{
      player_1: players.player_1.getShipData(),
    },
    hitData:{},
    isGameStarted: false,  
    currentPlayer: players.getCurrentPlayer()
  });

  useEffect(() => {
    console.log(gameData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData.hitData]);

  return (
    
    <gameDataContext.Provider value={[gameData, dispatch]}>
      <div className='game' data-status={gameData.isGameStarted}>
          {!gameData.isGameStarted && <Menu />}
          <PlayerBoard />
          {!gameData.isGameStarted && <Ships />}
          {gameData.isGameStarted && <OpponentBoard currentPlayer={gameData.currentPlayer} />}

      </div>
    </gameDataContext.Provider>
  );
};

export default Game;
