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
        const [hitData, hitStatus] = player_1.attack(row, column);
        for(let coordinate in hitData){
            possibleMoves = possibleMoves.filter(moves => moves !== coordinate);
        }
    }

    return {player_1, player_2, getCurrentPlayer, changeTurn, computerAttack};
}

export const players = Players();