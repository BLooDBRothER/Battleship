import React, { useState } from 'react';
import Grid from './Grid';

const Board = () => {
  const [gridCount, setGridCount] = useState([...Array(100).keys()]);
  return (
      <div className="game-board">
        {gridCount.map(cnt => <Grid key={cnt} />)}
      </div>
  );
};

export default Board;
