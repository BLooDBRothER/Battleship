import React, { useEffect, useReducer, useState } from 'react';
import { players } from '../../game_logic/Players';
import Menu from '../menu/Menu';
import OpponentBoard from './OpponentBoard';
import PlayerBoard from './PlayerBoard';
import { ACTIONS, reducer } from './reducer';
import Ships from './Ships';


export const gameDataContext = React.createContext(null);

const Game = () => {
  const [gameData, dispatch] = useReducer(reducer, {
    board: [],
    hitData: {},
    playerHitData: {},
    isGameStarted: false, 
    currentPlayer: players.getCurrentPlayer()
  });

  useEffect(() => {
    dispatch({type: ACTIONS.INIT})
  }, []);

  // useEffect(() => {
  //   if(gameData.currentPlayer === 'player_2'){
  //     console.log('player_2', gameData);
  //     dispatch({type: ACTIONS.RANDOM_ATTACK});
  //     return;
  //   }
  //   console.log('player_1', gameData);
  // }, [gameData.currentPlayer]);

  useEffect(() => {
    console.log(gameData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData]);

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
