import React, { useEffect, useReducer } from 'react';
import { ACTIONS, reducer } from './reducer';
import { players } from '../../game_logic/Players';
import OpponentBoard from './OpponentBoard';
import PlayerBoard from './PlayerBoard';
import Ships from './Ships';
import Menu from '../menu/Menu';
import GameOver from './GameOver';

export const gameDataContext = React.createContext(null);

const Game = () => {
  const [gameData, dispatch] = useReducer(reducer, {
    board: players.player_1.getGameBoard(),
    hitData: {},
    playerHitData: {},
    shipData: {},
    isGameStarted: false, 
    playerWon: '',
    currentPlayer: players.getCurrentPlayer()
  });

  useEffect(() => {
    console.log(gameData.currentPlayer)
  }, [gameData.currentPlayer]);

  useEffect(() => {
    if(gameData.currentPlayer === 'player_1' || gameData.playerWon !== '') return;
    setTimeout(() => {
      dispatch({type: ACTIONS.RANDOM_ATTACK});
    }, 300);
  }, [gameData.currentPlayer]);

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
      {gameData.playerWon !== '' && <GameOver playerWon={gameData.playerWon} />}
    </gameDataContext.Provider>
  );
};

export default Game;
