import React, { useContext} from 'react';
import { gameDataContext } from './Game';
import Grid from './Grid';

const PlayerBoard = () => {
  const gameData = useContext(gameDataContext)[0];
  return (
      <div className={`game-board player-board ${gameData.currentPlayer || !gameData.isGameStarted === 'player_2' ? 'active' : 'inactive'}`}>
        {gameData.board.map((row, rowIdx) => {
          return row.map((grid, gridIdx) => {
            return <Grid key={`${rowIdx}+${gridIdx}`} row={rowIdx} column={gridIdx} data={grid} />
          })
        })}
      </div>
  );
};

export default PlayerBoard;

//game-board player-board ${gameData.currentPlayer === 'player_2' ? 'active' : 'inactive'}