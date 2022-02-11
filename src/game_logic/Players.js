import { Game_Board } from "./Game_Board"

export const Players = () => {    
    const generatePossibleMoves = () => {
        const possibleMoves = [];
        for(let row=0; row<=9; row++){
            for(let column=0; column<=9; column++){
                possibleMoves.push(`${row}${column}`);
            }
        }
        return possibleMoves;
    }

    const player_1 = Game_Board();
    const player_2 = Game_Board();
    const players_life = {};

    const getPlayersLife = () => players_life;

    const createShipLifeData = () => {
        players_life.player_1 = getShipsLife(player_1);
        players_life.player_2 = getShipsLife(player_2);
        return {...players_life};
    }

    const getShipsLife = (player) => {
        const player_ships = player.getShipData();
        const player_ships_life = {};
        for(let ship in player_ships){
            player_ships_life[ship] = player_ships[ship].getLife();
        }
        return {...player_ships_life};
    }

    const updateShipLife = (shipName) => {
        const [playerName, playerObj] = currentPlayer === 'player_1' ? ['player_2', player_2] : ['player_1', player_1];
        const changeShipLife = {};
        changeShipLife[shipName] = playerObj.getShipData()[shipName].getLife();
        players_life[playerName] = {...players_life[playerName], ...changeShipLife};
        return {...players_life};
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

    const computerAttack = () => {
        const randomCoordinateIndex = possibleMoves[Math.floor(Math.random() * (possibleMoves.length))];
        const [row, column] = deCodeStringCoordinate(randomCoordinateIndex);
        const [hitData, hitShip] = player_1.attack(row, column);
        if(hitShip){
            updateShipLife(hitShip);
        }
        for(let coordinate in hitData){
            possibleMoves = possibleMoves.filter(moves => moves !== coordinate);
        }
        return possibleMoves.length;
    }

    return {player_1, player_2, getCurrentPlayer, changeTurn, computerAttack, createShipLifeData, updateShipLife, getPlayersLife};
}

export const players = Players();