// import { Game_Board } from '../../game_logic/Game_Board';
import { players } from '../../game_logic/Players';

// export const player_1_Data = Game_Board();
// export const player_2_Data = Game_Board();

export const ACTIONS = {
    INIT: "initiate",
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
        case ACTIONS.INIT:
            prevState = {...state}
            prevState.board = players.player_1.getGameBoard();
            return {...prevState}

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
            console.log(prevState);
            return {...prevState};
        
        case ACTIONS.START_GAME:
            if(!players.player_1.getIsAllShipPlaced()){
                return state;
            }
            prevState = {...state};
            players.player_2.generateBoard();
            prevState.isGameStarted = true;
            return {...prevState};

        case ACTIONS.ATTACK: 
            prevState = {...state};
            const hitData = players.player_2.attack(action.payload.row, action.payload.column)[0];  
            players.changeTurn();
            console.log(hitData);
            prevState.hitData = {...prevState.hitData, ...hitData} 
            prevState.currentPlayer = 'player_2';
            players.computerAttack();
            prevState.board = players.player_1.getGameBoard();
            prevState.currentPlayer = 'player_1';
            return {...prevState};

        // case ACTIONS.RANDOM_ATTACK:
        //     prevState = {...state};
        //     players.computerAttack();
        //     console.log(players.player_1.getGameBoard());
        //     prevState.board = players.player_1.getGameBoard();
        //     prevState.currentPlayer = 'player_1';
        //     console.log(prevState);
        //     return {...prevState};
            // return {...prevState};

        default:
            throw new Error();
    }
}