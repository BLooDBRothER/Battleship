import { Ship } from "./Ship";

export const Game_Board = () => {
    
    const initialize = () => {
        const tempBoard = [];
        for(let i=0; i<10; i++){
            tempBoard.push([]);
            for(let j=0; j<10; j++){
                const gridObj = {
                    isHit: false,
                    ship: null
                }
                tempBoard[i].push(gridObj);
            }
        }
        return tempBoard;
    }
    const gameBoard = initialize();
    const shipData = {};
    const getGameBoard = () => gameBoard;

    const removeShip = (shipName) => {
        const ship = shipData[shipName];
        const coordinate = ship.coordinate;
        if(ship.orientation === "horizontal"){
            for(let i=0; i<ship.length; i++){
                gameBoard[coordinate[0]][coordinate[1]+i] = {...gameBoard[coordinate[0]][coordinate[1]+i], ship: null};
            }
        }
        else{
            for(let i=0; i<ship.length; i++){
                gameBoard[coordinate[0]+i][coordinate[1]] = {...gameBoard[coordinate[0]+i][coordinate[1]], ship: null};
            }    
        }
    }
    
    const getGridData = ([...coordinate]) => {
        return gameBoard[coordinate[0]][coordinate[1]];
    }

    const getShipData = () =>{
        return shipData;
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
        return true;
    }

    const assignShipCoordinates = (length, orientation, [...coordinate], shipName) => {
        if(!placeShip(length, orientation, coordinate)) return false;
        const [row, column] = coordinate;
        const ship = Ship(length, orientation, coordinate);
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
        console.log(gameBoard);
        shipData[shipName] = ship;
        return true;
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
                if(isValidCoordinate(currRow, currColumn) && getGridData([currRow, currColumn]).ship){
                    return true;
                }
            }
        }
        return false;
    }
    
    return {getGameBoard, getGridData, getShipData, placeShip, assignShipCoordinates, removeShip};
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