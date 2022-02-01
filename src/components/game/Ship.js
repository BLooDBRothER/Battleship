import React, { useEffect, useState } from 'react';
import { FaMapPin } from 'react-icons/fa';

const ShipGroup = ({ totalShips, shipLength, shipName }) => {
    const [ship, setShip] = useState([]);
    const returnShip = () => {
        const ship = [];
        for (let i = 0; i < totalShips; i++) {
            const shipPart = returnShipPart();
            ship.push(<Ship key={`ship-${i}`} shipLength={shipLength} shipPart={shipPart} />);
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

const Ship = ({ shipPart, shipLength }) => {
    //Event Listener
    const handleDragStart = (e) => {
        console.log(e.target, shipLength);
        e.target.dataset.length = shipLength;
        e.dataTransfer.setData("length", shipLength);
        e.currentTarget.classList.add("dragging");
    }

    const handleDragEnd = (e) => {
        delete e.target.dataset.length;
        e.target.classList.remove("dragging");
        e.target.classList.remove("cursor-grabbing");
    }
    const changeCursorGrabbing = (isGrabbed, e) => {
        isGrabbed ? e.currentTarget.classList.add("cursor-grabbing") : e.currentTarget.classList.remove("cursor-grabbing");
    }
    return (
        <div className={`game-ship ship-${shipLength}`} draggable="true" onDragStart={handleDragStart} onDragEnd={handleDragEnd} onMouseDown={changeCursorGrabbing.bind(null, true)} onMouseUp={changeCursorGrabbing.bind(null, false)}>
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
