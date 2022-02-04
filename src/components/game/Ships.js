import React from 'react';
import Ship from './Ship';

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

const ShipGroup = ({ totalShips, shipLength, shipName }) => {
  const returnShip = () => {
      const ship = [];
      for (let i = 0; i < totalShips; i++) {
          // const shipPart = returnShipPart();
          ship.push(<Ship key={`ship-${i}`} shipLength={shipLength} shipName={`${shipName}_${i}`} />);
      }
      return ship;
  }

  return (
      <div className={`game-ships--group game-ship--${shipName}`}>
          {returnShip()}
      </div>
  );
};

export default Ships;
