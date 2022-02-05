import React, { useContext} from 'react';
import { gameDataContext } from './Game';
import Grid from './Grid';

const Board = ({isOwner}) => {
  const gameData = useContext(gameDataContext)[0];
  const board = isOwner ? gameData.board.player_1 : gameData.board.player_2;
  return (
      <div className={`game-board ${isOwner ? "player-board" : "opponent-board"}`}>
        {board.map((row, rowIdx) => {
          return row.map((grid, gridIdx) => {
            return <Grid key={`${rowIdx}+${gridIdx}`} row={rowIdx} column={gridIdx} data={grid} isOwner={isOwner} />
          })
        })}
      </div>
  );
};

export default Board;
