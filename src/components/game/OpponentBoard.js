import React from 'react';
import OpponentGrid from './Opponent_Grid';

const OpponentBoard = ({currentPlayer}) => {
    const iterateValue = Array(100).fill(0);
    return (
      <div className={`game-board opponent-board ${currentPlayer === 'player_1' ? 'active' : 'inactive'}`}>
        {
          iterateValue.map((val, idx) => {
            const row = Math.floor(idx / 10);
            const col = idx % 10;
            return <OpponentGrid key={`${row}+${col}`} row={row} column={col} />
          })
        }
      </div>
    );
};

export default OpponentBoard;