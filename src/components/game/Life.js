import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const Life = ({shipData}) => {
  return (
    <div className='life'>
        <div className='life-ship-group life-battleship'>
            <ShipLife shipData={shipData} shipName='battleship_0'/>
        </div>
        <div className='life-ship-group life-cruiser'>
            <ShipLife shipData={shipData} shipName='cruiser_0' />
            <ShipLife shipData={shipData} shipName='cruiser_1' />
        </div>
        <div className='life-ship-group life-submarine'>
            <ShipLife shipData={shipData} shipName='submarine_0' />
            <ShipLife shipData={shipData} shipName='submarine_1' />
            <ShipLife shipData={shipData} shipName='submarine_2' />
        </div>
        <div className='life-ship-group life-boat'>
            <ShipLife shipData={shipData} shipName='boat_0' />
            <ShipLife shipData={shipData} shipName='boat_1' />
            <ShipLife shipData={shipData} shipName='boat_2' />
            <ShipLife shipData={shipData} shipName='boat_3' />
        </div>
    </div>
  );
};

const ShipLife = ({shipData, shipName}) => {
    const [life, setLife] = useState(shipData[shipName][0]);
    useEffect(() => {
        setLife(shipData[shipName][0]);
    }, [shipData, shipName]);
    const count = shipData[shipName][1];
    return (
        <div className='life-ship'>
            <LifePart count={count} life={life} />
        </div>
    )
}

const LifePart = ({count, life}) => {
    const [parts, setParts] = useState([]);

    useEffect(() => {
        const tempPart = [];
        for(let i=1; i<=count; i++){
            tempPart.push(
                <div key={i} className='life-part'>
                    <FaHeart className={`life-part--ic ${life ? '' : 'dead'}`} />
                </div>
            );
        }
        setParts(tempPart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [life])

    return parts;
}

export default Life;
