import React, { useContext} from 'react';
import { gameDataContext } from './Game';
import Grid from './Grid';
import Life from './Life';

const PlayerBoard = () => {
  const gameData = useContext(gameDataContext)[0];
  return (
      <>
        {gameData.isGameStarted && <Life shipData={gameData.shipData.player_1}/>}
        <div>
          <div className={`game-board player-board ${gameData.currentPlayer === 'player_2' || !gameData.isGameStarted ? 'active' : 'inactive'}`}>
            {gameData.board.map((row, rowIdx) => {
              return row.map((grid, gridIdx) => {
                return <Grid key={`${rowIdx}+${gridIdx}`} row={rowIdx} column={gridIdx} data={grid} />
              });
            })}
          </div>
          {gameData.isGameStarted && <h2>{localStorage.getItem('playerName')}</h2>}
        </div>
      </>
  );
};

export default PlayerBoard;

//game-board player-board ${gameData.currentPlayer === 'player_2' ? 'active' : 'inactive'}