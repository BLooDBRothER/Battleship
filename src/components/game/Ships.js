import React from 'react';
import ShipGroup from './Ship';

const Ships = () => {
  return (
    <div className='game-ships'>
      <ShipGroup totalShips={1} shipLength={4} shipName="battleship" />
      <ShipGroup totalShips={2} shipLength={3} shipName="cruiser" />
      <ShipGroup totalShips={3} shipLength={2} shipName="submarine" />
      <ShipGroup totalShips={4} shipLength={1} shipName="boat" />
    </div>
  );
};

export default Ships;
