import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { gameDataContext } from './Game';
import { ACTIONS, playerData } from './reducer';
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
    const shipData = gameData.shipData.player;
    if(Object.keys(shipData).length !== 0){
      for(let shipName in shipData){
        const ship = shipData[shipName];
        const [shipRow, shipCol] = ship.coordinate;
        if(shipRow === row && shipCol === column){
          setShip({shipName, shipData: ship});
          return;
        }
        else{
          setShip(false);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData]);

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
    if(isOverLapping && !isOverLapping.classList.contains("dragging")) return;
    const draggedElement = document.querySelector(".dragging");
    const length = +draggedElement.dataset.length;
    const orientation = draggedElement.dataset.orientation;
    if(playerData.placeShip(length, orientation, [row, column])){
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
      if(shipParent.contains(draggedElement)){
        shipParent.removeChild(draggedElement);
      }
    }
    setToggleData(prev => ({...prev, toEnable:false}))
  }
  return (
    <div 
     id={`grid-${row}-${column}`}
     className='game-board--grid' 
     onDragOver={handleDragOver} 
     onDrop={handleDrop} 
     onDragEnter={handleDragEnter} 
     onDragLeave={handleDragLeave}>
     {ship && <Ship 
                shipLength={ship.shipData.length} 
                shipName={ship.shipName} 
                dispatch={dispatch} 
                orientationIsVertical={ship.shipData.orientation === "vertical" ? true: false} /> }
    </div>
    )
};

export default Grid;
