import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const Life = () => {
  return (
    <div className='life'>
        <div className='life-ship-group life-battleship'>
            <ShipLife shipName='battleshi_0' count={4} />
        </div>
        <div className='life-ship-group life-cruiser'>
            <ShipLife shipName='cruiser_0' count={3} />
            <ShipLife shipName='cruiser_1' count={3} />
        </div>
        <div className='life-ship-group life-submarine'>
            <ShipLife shipName='submarine_0' count={2} />
            <ShipLife shipName='submarine_1' count={2} />
            <ShipLife shipName='submarine_2' count={2} />
        </div>
        <div className='life-ship-group life-boat'>
            <ShipLife shipName='boat_0' count={1} />
            <ShipLife shipName='boat_1' count={1} />
            <ShipLife shipName='boat_2' count={1} />
            <ShipLife shipName='boat_3' count={1} />
        </div>
    </div>
  );
};

const ShipLife = ({shipName, count}) => {
    return (
        <div className='life-ship'>
            <LifePart count={count} />
        </div>
    )
}

const LifePart = ({count}) => {
    const [parts, setParts] = useState([]);

    useEffect(() => {
        const tempPart = []
        for(let i=0; i<count; i++){
            tempPart.push(
                <div key={i} className='life-part'>
                    <FaHeart className='life-part--ic' />
                </div>
            );
        }
        setParts(tempPart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return parts;
}

export default Life;
