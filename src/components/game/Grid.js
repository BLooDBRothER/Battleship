/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { FaSkullCrossbones } from 'react-icons/fa';
import { GiCrossMark } from 'react-icons/gi';
import { BiCrosshair } from 'react-icons/bi';
import { VscDebugBreakpointLog } from 'react-icons/vsc';
import { BsShieldFillX } from 'react-icons/bs';
import { gameDataContext } from './Game';
import { ACTIONS, players } from './reducer';
import Ship from './Ship';

const togglePositiveHighlightGrid = (toHighlight, row, column, shipLength, orientation) => {
  if(orientation === "horizontal"){
    for (let i = 0; i < shipLength; i++) {
      const shipPlace = document.getElementById(`grid-${row}-${column+i}`);
      toHighlight ? shipPlace.classList.add("highlight-positive") : shipPlace.classList.remove("highlight-positive");
    }
  }
  else{
    for (let i = 0; i < shipLength; i++) {
      const shipPlace = document.getElementById(`grid-${row+i}-${column}`);
      toHighlight ? shipPlace.classList.add("highlight-positive") : shipPlace.classList.remove("highlight-positive");
    }
  }
  
}

const toggleNegativeHighlightGrid = (toHighlight, row, column, shipLength, orientation) => {
  if(orientation === "horizontal"){
    for(let i=0; i<shipLength && column+i<=9; i++){
      const shipPlace = document.getElementById(`grid-${row}-${column+i}`);
      toHighlight ? shipPlace.classList.add("highlight-negative") : shipPlace.classList.remove("highlight-negative");
    }
  }
  else{
    for(let i=0; i<shipLength && row+i<=9; i++){
      const shipPlace = document.getElementById(`grid-${row+i}-${column}`);
      toHighlight ? shipPlace.classList.add("highlight-negative") : shipPlace.classList.remove("highlight-negative");
    }
  }
}

const Grid = ({ row, column, data }) => {

  const [toggleData, setToggleData] = useState(null);
  const [gameData, dispatch] = useContext(gameDataContext);
  const [ship, setShip] = useState(false);

  useEffect(() => {
    const shipData = data.ship;
    if(!data.ship) {
      setShip(false);
      return;
    };
    const [shipRow, shipCol] = shipData.coordinate;
    if(shipRow === row && shipCol === column){
      setShip({...shipData});
    }
    else{
      setShip(false);
    }
  }, [data]);

  const handleHighlightGrid = () => {
    if(toggleData === null) return;
    toggleData.isValidPlace 
      ? togglePositiveHighlightGrid(toggleData.toEnable, row, column, toggleData.length, toggleData.orientation)
      : toggleNegativeHighlightGrid(toggleData.toEnable, row, column, toggleData.length, toggleData.orientation);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(handleHighlightGrid, [toggleData]);

  //Evnet Listener
  const handleDragEnter = (e) => {
    const isOverLapping = document.querySelector(`#grid-${row}-${column} .ship-container`);
    const draggedElement = document.querySelector(".dragging");
    const length = +draggedElement.dataset.length;
    const orientation = draggedElement.dataset.orientation;
    if(isOverLapping && !isOverLapping.classList.contains("dragging")) {
      setTimeout(() => {
        setToggleData({isValidPlace: false, toEnable: true, length, orientation});
      }, 0);
      return
    };
    if(players.player_1.placeShip(length, orientation, [row, column])){
      setTimeout(() => {
        setToggleData({isValidPlace: true, toEnable: true, length, orientation});
      }, 0);
    }
    else{
      setTimeout(() => {
        setToggleData({isValidPlace: false, toEnable: true, length, orientation});
      }, 0);
    }
  }

  const handleDragLeave = (e) => {
    setToggleData(prev => ({...prev, toEnable:false}))
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedElement = document.querySelector(".dragging");
    const length = +draggedElement.dataset.length;
    const orientation = draggedElement.dataset.orientation;
    const shipName = e.dataTransfer.getData("shipName");
    if(toggleData.isValidPlace){
      dispatch({type: ACTIONS.ADD_SHIP, payload: {length, orientation, coordinate: [row, column], shipName}});
      const shipType = shipName.split("_")[0];
      const shipParent = document.querySelector(`.game-ship--${shipType}`);
      if(shipParent?.contains(draggedElement)){
        shipParent.removeChild(draggedElement);
      }
    }
    setToggleData(prev => ({...prev, toEnable:false}));
  }

  return (
    <div 
     id={`grid-${row}-${column}`}
     className='game-board--grid' 
     onDragOver={gameData.isGameStarted ? null : handleDragOver} 
     onDrop={gameData.isGameStarted ? null : handleDrop} 
     onDragEnter={gameData.isGameStarted ? null : handleDragEnter} 
     onDragLeave={gameData.isGameStarted ? null : handleDragLeave}
     >
      {!data.isHit && <VscDebugBreakpointLog className='grid-ic grid-ic--pointer' />}
      {!data.isHit && <BiCrosshair className='grid-ic grid-ic--crosshair' />}
      {ship  && <Ship 
                  shipLength={ship.length} 
                  shipName={ship.shipName} 
                  dispatch={dispatch} 
                  orientationIsVertical={ship.orientation === "vertical" ? true: false}
                  isDraggable={!gameData.isGameStarted} /> }
      {data.isHit && data.ship && <div className='grid-ic--cnt'><FaSkullCrossbones className='grid-ic--normal grid-ic--pass animate__animated animate__bounceIn' /></div>}
      {data.isHit && !data.ship && !data.isSurroundHit && <div className='grid-ic--cnt'><GiCrossMark className='grid-ic--normal grid-ic--fail faded animate__animated animate__headShake' /></div>}
      {data.isHit && !data.ship && data.isSurroundHit && <div className='grid-ic--cnt'><BsShieldFillX className='grid-ic--normal grid-ic--shield animate__animated animate__bounceIn' /></div>}
    </div>
    )
};

export default Grid;