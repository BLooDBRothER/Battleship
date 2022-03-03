import { Ship } from "./Ship";

const shipList = [
    {
        shipName: "battleship_0",
        length: 4
    },
    {
        shipName: "cruiser_0",
        length: 3
    },
    {
        shipName: "cruiser_1",
        length: 3
    },
    {
        shipName: "submarine_0",
        length: 2
    },
    {
        shipName: "submarine_1",
        length: 2
    },
    {
        shipName: "submarine_2",
        length: 2
    },
    {
        shipName: "boat_0",
        length: 1
    },
    {
        shipName: "boat_1",
        length: 1
    },
    {
        shipName: "boat_2",
        length: 1
    },
    {
        shipName: "boat_3",
        length: 1
    }
];

export const isValidCoordinate = (row, column) => {
    return ((row >=0 && row <= 9) && (column >=0 && column <=9)) ? true : false;
}

export const Game_Board = () => {
    
    const initialize = () => {
        const tempBoard = [];
        for(let i=0; i<10; i++){
            tempBoard.push([]);
            for(let j=0; j<10; j++){
                const gridObj = {
                    isHit: false,
                    isSurroundHit: false,
                    ship: null
                }
                tempBoard[i].push(gridObj);
            }
        }
        return tempBoard;
    }
    const gameBoard = initialize();
    const shipData = {};
    let isAllShipPlaced = false;
    const getGameBoard = () => {
        return gameBoard.map(data => data.slice());
    };

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

    const getIsAllShipPlaced = () => isAllShipPlaced;

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
        const ship = Ship(length, orientation, coordinate, shipName);
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
        shipData[shipName] = ship;
        if(Object.keys(shipData).length === shipList.length) isAllShipPlaced = true;
        return true;
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

    const placeShipRandomly = (shipList, index) => {
        if(shipList.length === index) return;
        let isShipPlaced = false;
        while(!isShipPlaced){
            const coordinate = [Math.floor(Math.random() * (10)), Math.floor(Math.random() * 10)];
            const orientation = Math.floor(Math.random() * 1000) % 2 ? "horizontal" : "vertical";
            isShipPlaced = assignShipCoordinates(shipList[index].length, orientation, coordinate, shipList[index].shipName);
        }
        placeShipRandomly(shipList, ++index);
    }

    const generateBoard = () => {
        for(let shipName in shipData){
            removeShip(shipName);
        }
        placeShipRandomly(shipList, 0);
    }

    const attack = (row, column) => {
        const attackData = {};
        const gridData = getGridData([row, column]);
        if(gridData.ship){
            if(gridData.ship.hit()){
                closeSurround(gridData.ship, attackData);
            }
            const surroundCoordinatesIndex = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
            attackSurround(row, column, surroundCoordinatesIndex, 0, attackData);
        }
        attackData[`${row}${column}`] = gridData.ship ? 'shipHit' : 'missHit';
        gameBoard[row][column] = {...gridData, isHit:true};
        return [attackData, gridData.ship];
    }
    
    const attackSurround = (row, column, surroundCoordinatesIndex, index, attackData) => {
        if(index === 4) return;
        const surroundCoordinate = [(row + surroundCoordinatesIndex[index][0]), (column + surroundCoordinatesIndex[index][1])];
        if(isValidCoordinate(surroundCoordinate[0], surroundCoordinate[1])){
            const gridData = getGridData(surroundCoordinate);
            if(!gridData.isHit){
                attackData[`${surroundCoordinate[0]}${surroundCoordinate[1]}`] = 'surroundHit';
                gameBoard[surroundCoordinate[0]][surroundCoordinate[1]] = {...gridData, isHit: true, isSurroundHit: true};
            }
        }
        attackSurround(row, column, surroundCoordinatesIndex, ++index, attackData);
    }

    const closeSurround = (ship, attackData) => {
        if(ship.length === 1){
            closeSurroundSingleShip(ship.coordinate, attackData);
            return;
        }
        const [row, column] = ship.coordinate;
        const [start, end] = ship.orientation === "horizontal" 
                                ? [[row, column-1], [row, column+ship.length]] 
                                : [[row-1, column], [row+ship.length, column]];
        if(isValidCoordinate(start[0], start[1])){
            const gridData = getGridData(start);
            if(!gridData.isHit){
                attackData[`${start[0]}${start[1]}`] = 'surroundHit';
                gameBoard[start[0]][start[1]] = {...gridData, isHit: true, isSurroundHit: true};
            }
        }
        if(isValidCoordinate(end[0], end[1])){
            const gridData = getGridData(end);
            if(!gridData.isHit){
                attackData[`${end[0]}${end[1]}`] = 'surroundHit';
                gameBoard[end[0]][end[1]] = {...gridData, isHit: true, isSurroundHit: true};
            }
        }
    }

    const closeSurroundSingleShip = ([row, column], attackData) => {
        const surroundIndex = [[row+1, column], [row-1, column], [row, column+1], [row, column-1]];
        surroundIndex.forEach(index => {
            if(isValidCoordinate(index[0], index[1])){
                const gridData = getGridData(index);
                if(!gridData.isHit){
                    attackData[`${index[0]}${index[1]}`] = 'surroundHit';
                    gameBoard[index[0]][index[1]] = {...gridData, isHit: true, isSurroundHit: true};
                }
            }
        });

    }

    return {getGameBoard, getGridData, getShipData, placeShip, assignShipCoordinates, removeShip, generateBoard, getIsAllShipPlaced, attack};
}