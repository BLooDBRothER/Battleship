import React, { useEffect, useState } from 'react';
import { FaMapPin } from 'react-icons/fa';
import { AiOutlineRotateRight } from 'react-icons/ai';
import { ACTIONS, player_1_Data } from './reducer';

const Ship = ({ shipLength, shipName, dispatch, orientationIsVertical=false, isDraggable=true}) => {
    const [isRotateVisible, setIsRotateVisible] = useState(false);
    const [isVertical, setIsVertical] = useState(false);
    useEffect(() => {
        setIsVertical(orientationIsVertical)
    },[orientationIsVertical]);

    const returnShipPart = () => {
        const shipPart = [];
        for (let i = 0; i < shipLength; i++) {
            shipPart.push(<ShipPart key={`part-${i}`} />)
        }
        return shipPart;
    }

    //Event Listener
    const handleDragStart = (e) => {
        if(!isDraggable){
            e.prevetDefault();
            return;
        }
        setIsRotateVisible(false);
        if(player_1_Data.getShipData()[shipName]){
            player_1_Data.removeShip(shipName);
            setTimeout(() => {e.target.classList.add("none");}, 10);
        }
        e.currentTarget.parentElement.dataset.length = shipLength;
        e.currentTarget.parentElement.dataset.orientation = isVertical ? "vertical" : "horizontal";
        e.currentTarget.parentElement.classList.add("dragging");
        e.dataTransfer.setData("shipName", shipName);
    }

    const handleDragEnd = (e) => {
        const ship = player_1_Data.getShipData()[shipName];
        if(ship){
            dispatch({type: ACTIONS.ADD_SHIP, payload: {length: shipLength, orientation: ship.orientation, coordinate: ship.coordinate, shipName}});
        }
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
        const ship = player_1_Data.getShipData()[shipName];
        if(ship){
            const [toggleOrientation, currentOrientation] = isVertical ? ["horizontal", "vertical"] : ["vertical", "horizontal"];
            dispatch({type: ACTIONS.ROTATE_SHIP, payload: {length: shipLength, toggleOrientation, currentOrientation, coordinate: ship.coordinate, shipName}});
        }
        else{
            setIsVertical(prev => !prev);
        }
    }
    return (
        <div className={`ship-container`} onMouseEnter={() => {setIsRotateVisible(true)}} onMouseLeave={() => {setIsRotateVisible(false)}}>
            {(isRotateVisible && isDraggable) && <AiOutlineRotateRight className='game-ship--rotate' onClick={handleRotate} />}
            <div 
             className={`game-ship ship-${shipLength} ${isVertical && "vertical"}`} 
             draggable={isDraggable} 
             onDragStart={handleDragStart} 
             onDragEnd={!isDraggable ? null : handleDragEnd}
             onMouseDown={!isDraggable ? null : changeCursorGrabbing.bind(null, true)} 
             onMouseUp={!isDraggable ? null : changeCursorGrabbing.bind(null, false)}>
                {returnShipPart()}
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

export default Ship;
