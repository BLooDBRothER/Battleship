import React, { useState, useEffect } from 'react';
import { playerData } from './Game';

const togglePositiveHighlightGrid = (toHighlight, row, column, shipLength, orientation) => {
  if(orientation === "horizontal"){
    for (let i = 0; i < shipLength; i++) {
      const shipPlace = document.getElementById(`${row} ${column+i}`);
      toHighlight ? shipPlace.classList.add("highlight-positive") : shipPlace.classList.remove("highlight-positive");
    }
  }
  else{
    for (let i = 0; i < shipLength; i++) {
      const shipPlace = document.getElementById(`${row+i} ${column}`);
      toHighlight ? shipPlace.classList.add("highlight-positive") : shipPlace.classList.remove("highlight-positive");
    }
  }
  
}

const toggleNegativeHighlightGrid = (toHighlight, row, column, shipLength, orientation) => {
  if(orientation === "horizontal"){
    for(let i=0; i<shipLength && column+i<=9; i++){
      const shipPlace = document.getElementById(`${row} ${column+i}`);
      toHighlight ? shipPlace.classList.add("highlight-negative") : shipPlace.classList.remove("highlight-negative");
    }
  }
  else{
    for(let i=0; i<shipLength && row+i<=9; i++){
      const shipPlace = document.getElementById(`${row+i} ${column}`);
      toHighlight ? shipPlace.classList.add("highlight-negative") : shipPlace.classList.remove("highlight-negative");
    }
  }
}

const Grid = ({ row, column, data, setPlayerBoad }) => {

  const [toggleData, setToggleData] = useState({});

  const handleHighlightGrid = () => {
    toggleData.isValidPlace 
      ? togglePositiveHighlightGrid(toggleData.toEnable, row, column, toggleData.length, toggleData.orientation)
      : toggleNegativeHighlightGrid(toggleData.toEnable, row, column, toggleData.length, toggleData.orientation);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleHighlightGrid, [toggleData]);

  //Evnet Listener
  const handleDragEnter = (e) => {
    const draggedElement = document.querySelector(".dragging");
    // playerData.placeShip()
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
    setToggleData(prev => ({...prev, toEnable:!prev.toEnable}))
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
    if(playerData.assignShipCoordinates(length, orientation, [row, column], shipName)){
      e.target.appendChild(draggedElement);
    }
    setToggleData(prev => ({...prev, toEnable:!prev.toEnable}))
  }
  return (
    <div 
     id={`${row} ${column}`}
     className='game-board--grid' 
     onDragOver={handleDragOver} 
     onDrop={handleDrop} 
     onDragEnter={handleDragEnter} 
     onDragLeave={handleDragLeave}>
    </div>
    )
};

export default Grid;
