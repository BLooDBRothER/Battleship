import React, { useEffect, useState } from 'react';
import { FaMapPin } from 'react-icons/fa';

const ShipGroup = ({ totalShips, shipLength, shipName }) => {
    const [ship, setShip] = useState([]);
    const returnShip = () => {
        const ship = [];
        for (let i = 0; i < totalShips; i++) {
            const shipPart = returnShipPart();
            ship.push(<Ship key={`ship-${i}`} shipPart={shipPart} />);
        }
        setShip(ship);
    }
    const returnShipPart = () => {
        const shipPart = [];
        for (let i = 0; i < shipLength; i++) {
            shipPart.push(<ShipPart key={`part-${i}`} />)
        }
        return shipPart;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(returnShip, []);

    return (
        <div className={`game-ships--group game-ship--${shipName}`}>
            {ship}
        </div>
    );
};

const Ship = ({ shipPart }) => {
    return (
        <div className='game-ship'>
            {shipPart}
        </div>
    )
}

const ShipPart = () => {
    return (
        <div className='game-ship--part'>
            <FaMapPin className='game-ship__part-ic' />
        </div>
    )
}

export default ShipGroup;
