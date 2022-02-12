// import { Game_Board } from '../../game_logic/Game_Board';
import { players } from '../../game_logic/Players';

export const ACTIONS = {
    ADD_SHIP: "add_ship",
    ROTATE_SHIP: "rotate_ship",
    GENERATE_BOARD: "generate_board",
    START_GAME: "start_game",
    ATTACK: "attack",
    RANDOM_ATTACK: "random_attack"
}

export function reducer(state, action){
    let prevState;
    switch(action.type){

        case ACTIONS.ADD_SHIP:
            players.player_1.assignShipCoordinates(action.payload.length, action.payload.orientation, action.payload.coordinate, action.payload.shipName);
            prevState = {...state};
            prevState.board = players.player_1.getGameBoard();
            return {...prevState};
        
        case ACTIONS.ROTATE_SHIP:
            players.player_1.removeShip(action.payload.shipName);
            if(!players.player_1.placeShip(action.payload.length, action.payload.toggleOrientation, action.payload.coordinate)){
                players.player_1.assignShipCoordinates(action.payload.length, action.payload.currentOrientation, action.payload.coordinate, action.payload.shipName);
                return state;
            }
            else{
                players.player_1.assignShipCoordinates(action.payload.length, action.payload.toggleOrientation, action.payload.coordinate, action.payload.shipName);
            }
            prevState = {...state};
            prevState.board = players.player_1.getGameBoard();
            return {...prevState};

        case ACTIONS.GENERATE_BOARD:
            prevState = {...state};
            players.player_1.generateBoard();
            prevState.board = players.player_1.getGameBoard();
            return {...prevState};
        
        case ACTIONS.START_GAME:
            if(!players.player_1.getIsAllShipPlaced()){
                return state;
            }
            prevState = {...state};
            players.player_2.generateBoard();
            prevState.shipData = players.createShipLifeData();
            prevState.isGameStarted = true;
            return {...prevState};

        case ACTIONS.ATTACK: 
            prevState = {...state};
            const [hitData, hitShipName] = players.player_2.attack(action.payload.row, action.payload.column);
            prevState.hitData = {...prevState.hitData, ...hitData} 
            prevState.shipData = hitShipName ? players.updateShipLife(hitShipName) : prevState.shipData;
            if(players.checkIsGameOver()){
                prevState.playerWon = players.getCurrentPlayer();
            }
            prevState.currentPlayer = players.changeTurn();
            // console.log(state.currentPlayer, prevState.currentPlayer);
            return {...prevState};
        
        case ACTIONS.RANDOM_ATTACK:
            prevState = {...state};
            prevState.currentPlayer = 'player_1';
            players.computerAttack();
            prevState.board = players.player_1.getGameBoard();
            prevState.shipData = players.getPlayersLife();
            if(players.checkIsGameOver()){
                prevState.playerWon = 'Battle AI';
            }
            prevState.currentPlayer = players.changeTurn();
            return {...prevState};

        default:
            throw new Error();
    }
}