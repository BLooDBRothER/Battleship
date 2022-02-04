import React, { useContext, useEffect, useState } from 'react';
import { gameDataContext } from './Game';
import Grid from './Grid';

const Board = () => {
  const [gameData, dispatch] = useContext(gameDataContext);
  useEffect(() => {
    console.log(gameData);
  })
  return (
      <div className="game-board">
        {gameData.board.player.map((row, rowIdx) => {
          return row.map((grid, gridIdx) => {
            return <Grid key={`${rowIdx}+${gridIdx}`} row={rowIdx} column={gridIdx} data={grid} />
          })
        })}
      </div>
  );
};

export default Board;
