// import { Game_Board } from '../../game_logic/Game_Board';
import { Players } from '../../game_logic/Players';

export let players;

const setPlayers = () => {
    players = Players();
}

export const ACTIONS = {
    ADD_SHIP: "add_ship",
    ROTATE_SHIP: "rotate_ship",
    GENERATE_BOARD: "generate_board",
    START_GAME: "start_game",
    ATTACK: "attack",
    RANDOM_ATTACK: "random_attack",
    SET_INITIAL: 'set_initial'
}

export function reducer(state, action){
    let newState;
    switch(action.type){
        case ACTIONS.SET_INITIAL:
            setPlayers();
            console.log(players);
            const INITIAL_VALUE = {
                board: players.player_1.getGameBoard(),
                hitData: {},
                playerHitData: {},
                shipData: {},
                isGameStarted: false, 
                playerWon: '',
                currentPlayer: players.getCurrentPlayer()
            }
            return {...INITIAL_VALUE};

        case ACTIONS.ADD_SHIP:
            players.player_1.assignShipCoordinates(action.payload.length, action.payload.orientation, action.payload.coordinate, action.payload.shipName);
            newState = {...state};
            newState.board = players.player_1.getGameBoard();
            return {...newState};
        
        case ACTIONS.ROTATE_SHIP:
            players.player_1.removeShip(action.payload.shipName);
            if(!players.player_1.placeShip(action.payload.length, action.payload.toggleOrientation, action.payload.coordinate)){
                players.player_1.assignShipCoordinates(action.payload.length, action.payload.currentOrientation, action.payload.coordinate, action.payload.shipName);
                return state;
            }
            else{
                players.player_1.assignShipCoordinates(action.payload.length, action.payload.toggleOrientation, action.payload.coordinate, action.payload.shipName);
            }
            newState = {...state};
            newState.board = players.player_1.getGameBoard();
            return {...newState};

        case ACTIONS.GENERATE_BOARD:
            newState = {...state};
            players.player_1.generateBoard();
            newState.board = players.player_1.getGameBoard();
            return {...newState};
        
        case ACTIONS.START_GAME:
            if(!players.player_1.getIsAllShipPlaced()){
                return state;
            }
            newState = {...state};
            players.player_2.generateBoard();
            newState.shipData = players.createShipLifeData();
            newState.isGameStarted = true;
            return {...newState};

        case ACTIONS.ATTACK: 
            newState = {...state};
            const [hitData, hitShip] = players.player_2.attack(action.payload.row, action.payload.column);
            newState.hitData = {...newState.hitData, ...hitData} 
            newState.shipData = hitShip ? players.updateShipLife(hitShip.shipName) : newState.shipData;
            if(players.checkIsGameOver()){
                newState.playerWon = localStorage.getItem('playerName');
            }
            newState.currentPlayer = players.changeTurn();
            return {...newState};
        
        case ACTIONS.RANDOM_ATTACK:
            newState = {...state};
            newState.currentPlayer = 'player_1';
            players.computerAttack();
            newState.board = players.player_1.getGameBoard();
            newState.shipData = players.getPlayersLife();
            if(players.checkIsGameOver()){
                newState.playerWon = 'Battle AI';
            }
            newState.currentPlayer = players.changeTurn();
            return {...newState};

        default:
            throw new Error();
    }
}