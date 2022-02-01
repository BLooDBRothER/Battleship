import React from 'react';

const togglePositiveHighlightGrid = (toHighlight, startingElementId, shipLength) => {
  for (let i = 0; i < shipLength; i++) {
    const shipPlace = document.getElementById(`${startingElementId + i}`);
    toHighlight ? shipPlace.classList.add("highlight-positive") : shipPlace.classList.remove("highlight-positive");
  }
}

const toggleNegativeHighlightGrid = (toHighlight, startingElementId, endLimit) => {
  console.log("negatie")
  for (let i = startingElementId; i < endLimit; i++) {
    console.log(i);
    const shipPlace = document.getElementById(`${i}`);
    toHighlight ? shipPlace.classList.add("highlight-negative") : shipPlace.classList.remove("highlight-negative");
  }
}

const Grid = ({ id }) => {

  //Evnet Listener
  const handleDragEnter = (e) => {
    const draggedElement = document.querySelector(".dragging");
    const enteredElementId = +e.target.id;
    const shipLength = +draggedElement.dataset.length;
    const limit = +(enteredElementId / 10).toFixed() * 10;
    enteredElementId + shipLength < limit 
      ? setTimeout(togglePositiveHighlightGrid.bind(null, true, enteredElementId, shipLength), 0) 
      : setTimeout(toggleNegativeHighlightGrid.bind(null, true, enteredElementId, limit), 0);
  }

  const handleDragLeave = (e) => {
    const draggedElement = document.querySelector(".dragging");
    const enteredElementId = +e.target.id;
    const shipLength = +draggedElement.dataset.length;
    const rowStartingIndex = +(enteredElementId / 10).toFixed() * 10;
    const limit = rowStartingIndex + 10;
    togglePositiveHighlightGrid(false, enteredElementId, shipLength);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedElement = document.querySelector(".dragging");
    console.log(draggedElement);
    e.target.appendChild(draggedElement);
  }
  return <div id={id} className='game-board--grid' onDragOver={handleDragOver} onDrop={handleDrop} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}></div>
};

export default Grid;
