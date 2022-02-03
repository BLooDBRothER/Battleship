import React, { useEffect, useState } from 'react';
import { FaMapPin } from 'react-icons/fa';
import { AiOutlineRotateRight } from 'react-icons/ai';
import { playerData } from './Game';

const ShipGroup = ({ totalShips, shipLength, shipName }) => {
    const [ship, setShip] = useState([]);
    
    const returnShip = () => {
        const ship = [];
        for (let i = 0; i < totalShips; i++) {
            const shipPart = returnShipPart();
            ship.push(<Ship key={`ship-${i}`} shipLength={shipLength} shipPart={shipPart} shipName={`${shipName}_${i}`} />);
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

const Ship = ({ shipPart, shipLength, shipName }) => {
    const [isRotateVisible, setIsRotateVisible] = useState(false);
    const [isVertical, setIsVertical] = useState(false);

    //Event Listener
    const handleDragStart = (e) => {
        setIsRotateVisible(false);
        if(playerData.getShipCoordinate(shipName)){
            playerData.removeShip(shipName);
            setTimeout(() => {e.target.classList.add("none");}, 10);
        }
        e.currentTarget.parentElement.dataset.length = shipLength;
        e.currentTarget.parentElement.dataset.orientation = isVertical ? "vertical" : "horizontal";
        e.currentTarget.parentElement.classList.add("dragging");
        e.dataTransfer.setData("shipName", shipName);
    }

    const handleDragEnd = (e) => {
        delete e.target.dataset.length;
        delete e.target.dataset.orientation;
        e.currentTarget.parentElement.classList.remove("dragging");
        e.target.classList.remove("cursor-grabbing");
        e.target.classList.remove("none");
    }
    const changeCursorGrabbing = (isGrabbed, e) => {
        isGrabbed ? e.currentTarget.classList.add("cursor-grabbing") : e.currentTarget.classList.remove("cursor-grabbing");
    }

    const handleRotate = (e) => {
        const coordinate = playerData.getShipCoordinate(shipName)?.coordinate;
        const toggleOrientation = isVertical ? "horizontal" : "vertical";
        const currentOrientation = isVertical ? "vertical" : "horizontal";
        // console.log(coordinate, orientation);
        if(coordinate) {
            playerData.removeShip(shipName);
            console.log(playerData.placeShip(shipLength, toggleOrientation, coordinate), shipName);
            if(!playerData.placeShip(shipLength, toggleOrientation, coordinate)){
                playerData.assignShipCoordinates(shipLength, currentOrientation, coordinate, shipName);
                return;
            }
            else{
                playerData.assignShipCoordinates(shipLength, toggleOrientation, coordinate, shipName);
            }
        };
        setIsVertical(prev => !prev);
    }
    return (
        <div className='ship-container' onMouseEnter={() => {setIsRotateVisible(true)}} onMouseLeave={() => {setIsRotateVisible(false)}}>
            {isRotateVisible && <AiOutlineRotateRight className='game-ship--rotate' onClick={handleRotate} />}
            <div className={`game-ship ship-${shipLength} ${isVertical && "vertical"}`} draggable="true" onDragStart={handleDragStart} onDragEnd={handleDragEnd} onMouseDown={changeCursorGrabbing.bind(null, true)} onMouseUp={changeCursorGrabbing.bind(null, false)}>
                {shipPart}
            </div>
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
