import React, { useContext } from 'react';
import { gameDataContext } from './Game';
import OpponentGrid from './Opponent_Grid';

const OpponentBoard = ({row, column}) => {
    const gameData = useContext(gameDataContext)[0];
    return (
        <div className="game-board opponent-board">
        {gameData.board.map((row, rowIdx) => {
          return row.map((grid, gridIdx) => {
            return <OpponentGrid key={`${rowIdx}+${gridIdx}`} row={rowIdx} column={gridIdx} />
          })
        })}
      </div>
    );
};

export default OpponentBoard;
