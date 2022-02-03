import React, { useState } from 'react';
import Grid from './Grid';

const Board = ({playerBoard, setPlayerBoard}) => {
  return (
      <div className="game-board">
        {playerBoard.map((row, rowIdx) => {
          return row.map((grid, gridIdx) => {
            return <Grid key={`${rowIdx}+${gridIdx}`} row={rowIdx} column={gridIdx} data={grid} setPlayerBoard={playerBoard} />
          })
        })}
      </div>
  );
};

export default Board;
