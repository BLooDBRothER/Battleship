import React, { useEffect, useRef, useState } from 'react';
import Ship from './Ship';

const Ships = () => {
  const [childCount, setChildCount] = useState(4);
  const [hide, setHide] = useState(false);
  useEffect(() => {  
    if(childCount === 0){
      setHide(true);
    }
  }, [childCount]);
  return (
    <>
      {!hide &&
        <div className='game-ships'>
          <ShipGroup totalShips={1} shipLength={4} setChildCount={setChildCount} shipName="battleship" />
          <ShipGroup totalShips={2} shipLength={3} setChildCount={setChildCount} shipName="cruiser" />
          <ShipGroup totalShips={3} shipLength={2} setChildCount={setChildCount} shipName="submarine" />
          <ShipGroup totalShips={4} shipLength={1} setChildCount={setChildCount} shipName="boat" />
        </div>}
    </>
  );
};

const ShipGroup = ({ totalShips, shipLength, shipName, setChildCount }) => {
  const [removeGroup, setRemoveGroup] = useState(false);
  const groupRef = useRef(null);
  // eslint-disable-next-line
  useEffect(() => {
    if (groupRef.current?.childElementCount === 0) {
      setRemoveGroup(true);
      setChildCount(prev => --prev);
    }
  });
  const returnShip = () => {
    const ship = [];
    for (let i = 0; i < totalShips; i++) {
      // const shipPart = returnShipPart();
      ship.push(<Ship key={`ship-${i}`} shipLength={shipLength} shipName={`${shipName}_${i}`} />);
    }
    return ship;
  }

  const removeElement = (e) => {
    const parentElement = e.target.parentElement;
    parentElement.removeChild(e.target);
    if(parentElement.childElementCount === 0){
      setChildCount(0);
    }
  }

  return (
    <>
      {!removeGroup &&
        <div ref={groupRef} className={`game-ships--group game-ship--${shipName}`} onAnimationEnd={removeElement}>
          {returnShip()}
        </div>}
    </>
  );
};

export default Ships;
