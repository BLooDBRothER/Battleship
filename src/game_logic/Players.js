import { Game_Board, isValidCoordinate } from "./Game_Board"

export const Players = () => {
    const generatePossibleMoves = () => {
        const possibleMoves = [];
        for (let row = 0; row <= 9; row++) {
            for (let column = 0; column <= 9; column++) {
                possibleMoves.push(`${row}${column}`);
            }
        }
        return possibleMoves;
    }

    const player_1 = Game_Board();
    const player_2 = Game_Board();
    const players_ship_life = {};

    const players_life = {
        player_1: 20,
        player_2: 20
    }

    const checkIsGameOver = () => {
        const playerName = currentPlayer === 'player_1' ? 'player_2' : 'player_1';
        return players_life[playerName] === 0;
    }

    const updatePlayerLife = (playerName) => {
        players_life[playerName] -= 1;
    }

    const getPlayersLife = () => players_ship_life;

    const createShipLifeData = () => {
        players_ship_life.player_1 = getShipsLife(player_1);
        players_ship_life.player_2 = getShipsLife(player_2);
        return { ...players_ship_life };
    }

    const getShipsLife = (player) => {
        const player_ships = player.getShipData();
        const player_ships_life = {};
        for (let ship in player_ships) {
            player_ships_life[ship] = player_ships[ship].getLife();
        }
        return { ...player_ships_life };
    }

    const updateShipLife = (shipName) => {
        const [playerName, playerObj] = currentPlayer === 'player_1' ? ['player_2', player_2] : ['player_1', player_1];
        updatePlayerLife(playerName);
        const changeShipLife = {};
        changeShipLife[shipName] = playerObj.getShipData()[shipName].getLife();
        players_ship_life[playerName] = { ...players_ship_life[playerName], ...changeShipLife };
        return { ...players_ship_life };
    }

    let currentPlayer = 'player_1';

    const changeTurn = () => {
        currentPlayer = currentPlayer === 'player_1' ? 'player_2' : 'player_1';
        return currentPlayer;
    }

    const getCurrentPlayer = () => currentPlayer;

    const deCodeStringCoordinate = (coordinate) => {
        return coordinate.split('').map(point => +point);
    }

    let possibleMoves = generatePossibleMoves();
    const aiData = {
        possibleMoves: [[0, -1], [0, 1], [1, 0], [-1, 0]],
        initialHitCoordinate: [],
        lastHitCoordinate: [],
        hitShip: null,
        filteredMoves: {
            vertical: [],
            horizontal: []
        },
        triggerAi: false,
        hitLock: null,
    }

    const aiAttackInitialization = ([...coordinate], hitShip) => {
        aiData.hitShip = hitShip;
        aiData.lastHitCoordinate = coordinate;
        aiData.initialHitCoordinate = coordinate;
        aiData.filteredMoves = aiData.possibleMoves.filter(move => isValidCoordinate((coordinate[0] + move[0]), (coordinate[1] + move[1])));
        aiData.hitLock = aiData.filteredMoves[Math.floor(Math.random() * (aiData.filteredMoves.length))];
        aiData.triggerAi = true;
    }

    const filterCoordinate = () => {
        aiData.lastHitCoordinate = aiData.initialHitCoordinate;
        aiData.filteredMoves = aiData.filteredMoves.filter(move => JSON.stringify(move) !== JSON.stringify(aiData.hitLock));
        aiData.hitLock = aiData.filteredMoves[Math.floor(Math.random() * (aiData.filteredMoves.length))];
    }

    const aiAttack = () => {
        const movesToTry = aiData.hitLock;
        const currentCoordinate = [(aiData.lastHitCoordinate[0] + movesToTry[0]), (aiData.lastHitCoordinate[1] + movesToTry[1])];
        const stringCoordinate = currentCoordinate.join('');
        if(!possibleMoves.find(moves => moves === stringCoordinate)){
            filterCoordinate();
            aiAttack();
            return;
        }
        const isHit = attackGivenCoordinate(currentCoordinate[0], currentCoordinate[1]);
        if(aiData.hitShip.getLife()[0] !== 0 && !isHit){
            filterCoordinate();
        }
        else{
            if(isHit.getLife()[0] !== 0){
                if(aiData.filteredMoves.length > 2){
                    const indexToCompare = aiData.hitLock[0] === 0 ? 1 : 0;
                    aiData.filteredMoves = aiData.filteredMoves.filter(move => move[indexToCompare] !== 0)
                }
            }
            aiData.lastHitCoordinate = currentCoordinate;
            aiData.triggerAi = isHit.getLife()[0] !== 0 ? true : false;
        }
    }

    const computerAttack = () => {
        if(aiData.triggerAi){
            aiAttack();
            return;
        }
        const randomCoordinateIndex = possibleMoves[Math.floor(Math.random() * (possibleMoves.length))];
        const [row, column] = deCodeStringCoordinate(randomCoordinateIndex);
        const hitShip = attackGivenCoordinate(row, column);
        if(hitShip?.getLife()[0]){
            aiAttackInitialization([row, column], hitShip);
        }
        return possibleMoves.length;
    }

    const attackGivenCoordinate = (row, column) => {
        const [hitData, hitShip] = player_1.attack(row, column);
        if (hitShip) {
            updateShipLife(hitShip.shipName);
        }
        for (let coordinate in hitData) {
            possibleMoves = possibleMoves.filter(moves => moves !== coordinate);
        }
        return hitShip;
    }

    return { player_1, player_2, getCurrentPlayer, changeTurn, computerAttack, createShipLifeData, updateShipLife, getPlayersLife, checkIsGameOver };
}