import { Ship } from "./Ship";

export const Game_Board = () => {
    const gameBoard = [];
    const shipCoordinate = {};
    const initialize = () => {
        for(let i=0; i<10; i++){
            gameBoard.push([]);
            for(let j=0; j<10; j++){
                const gridObj = {
                    isHit: false,
                    ship: null
                }
                gameBoard[i].push(gridObj);
            }
        }
    }
    const getGameBoard = () => gameBoard;

    const encodeCoordinateToString = (row, column) => {
        return String(row)+String(column);
    }

    const decodeCoodinateToPoints = (coordinate) => {
        return coordinate.split('').map(pts => +pts);
    }
    
    const getGridData = ([...coordinate]) => {
        return gameBoard[coordinate[0]][coordinate[1]];
    }

    const placeShip = (length, orientation, [...coordinate]) => {
        let isPlacementPossible, isNeighbourShipPresent;
        if(orientation === "horizontal"){
            isPlacementPossible = checkHorizontalPlacement(length, coordinate);
            isNeighbourShipPresent = checkNeighbourShipHorizontal(coordinate[0], coordinate[1], length);
        }
        else{
            isPlacementPossible = checkVerticalPlacement(length, coordinate);
            isNeighbourShipPresent = checkNeighbourShipVertical(coordinate[0], coordinate[1], length);
        }
        if(!isPlacementPossible || isNeighbourShipPresent){
            return false;
        }
        assignShipCoordinates(coordinate[0], coordinate[1], length, orientation);
        return true;
    }

    const assignShipCoordinates = (row, column, length, orientation) => {
        const ship = Ship(length);
        if(orientation === "horizontal"){
            for(let columnIndex=column; columnIndex<column+length; columnIndex++){
                gameBoard[row][columnIndex] = {...gameBoard[row][columnIndex], ship};
            }
        }
        else{
            for(let rowIndex=row; rowIndex<row+length; rowIndex++){
                gameBoard[rowIndex][column] = {...gameBoard[rowIndex][column], ship};
            }
        }
        shipCoordinate[encodeCoordinateToString(row, column)] = length;
    }

    const isValidCoordinate = (row, column) => {
        return ((row >=0 && row <= 9) && (column >=0 && column <=9)) ? true : false;
    }

    const checkHorizontalPlacement = (length, [...coordinate]) => {
        return isValidCoordinate(coordinate[0], coordinate[1]+length-1);
    }

    const checkVerticalPlacement = (length, [...coordinate]) => {
        return isValidCoordinate(coordinate[0]+length-1, coordinate[1]);
    }

    const checkNeighbourShipHorizontal = (row, column, length) => {
        for(let currColumnIndex = -1; currColumnIndex<=length; currColumnIndex++){
            const currColumn = column + currColumnIndex;
            for(let currRowIndex = -1; currRowIndex<=1; currRowIndex++){
                const currRow = row + currRowIndex;
                if(isValidCoordinate(currRow, currColumn) && getGridData([currRow, currColumn]).ship){
                    return true;
                }
            }
        }
        return false;
    }
    const checkNeighbourShipVertical = (row, column, length) => {
        for(let currRowIndex = -1; currRowIndex<=length; currRowIndex++){
            const currRow = row + currRowIndex;
            for(let currColumnIndex = -1; currColumnIndex<=1; currColumnIndex++){
                const currColumn = column + currColumnIndex;
                // console.log(currRow, currColumn, length);
                // if(currRow === 8 && currColumn === 5){
                //     console.log(getGridData([currRow, currColumn]).ship);
                // }
                if(isValidCoordinate(currRow, currColumn) && getGridData([currRow, currColumn]).ship){
                    return true;
                }
            }
        }
        return false;
    }
    
    return {initialize, getGameBoard, getGridData, placeShip};
}

// const initializeShip = () =>{
//     const battleShip = Ship(4);
//     const cruiser_1 = Ship(3);
//     const cruiser_2 = Ship(3);
//     const submarine_1 = Ship(2);
//     const submarine_2 = Ship(2);
//     const submarine_3 = Ship(2);
//     const boat_1 = Ship(1);
//     const boat_2 = Ship(1);
//     const boat_3 = Ship(1);
//     const boat_4 = Ship(1);
// }