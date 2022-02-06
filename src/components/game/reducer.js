// import { Game_Board } from '../../game_logic/Game_Board';
import { players } from '../../game_logic/Players';

// export const player_1_Data = Game_Board();
// export const player_2_Data = Game_Board();

export const ACTIONS = {
    ADD_SHIP: "add_ship",
    ROTATE_SHIP: "rotate_ship",
    GENERATE_BOARD: "generate_board",
    START_GAME: "start_game",
    ATTACK: "attack",
}

export function reducer(state, action){
    switch(action.type){
        case ACTIONS.ADD_SHIP:
            players.player_1.assignShipCoordinates(action.payload.length, action.payload.orientation, action.payload.coordinate, action.payload.shipName);
            return {...state, board: players.player_1.getGameBoard(), shipData:{...state.shipData, player: players.player_1.getShipData()}};
        
        case ACTIONS.ROTATE_SHIP:
            players.player_1.removeShip(action.payload.shipName);
            if(!players.player_1.placeShip(action.payload.length, action.payload.toggleOrientation, action.payload.coordinate)){
                players.player_1.assignShipCoordinates(action.payload.length, action.payload.currentOrientation, action.payload.coordinate, action.payload.shipName);
                return state;
            }
            else{
                players.player_1.assignShipCoordinates(action.payload.length, action.payload.toggleOrientation, action.payload.coordinate, action.payload.shipName);
            }
            return {...state, board: players.player_1.getGameBoard(), shipData:{...state.shipData, player: players.player_1.getShipData()}};

        case ACTIONS.GENERATE_BOARD:
            players.player_1.generateBoard();
            return {...state, board: players.player_1.getGameBoard(), shipData:{...state.shipData, player: players.player_1.getShipData()}};
        
        case ACTIONS.START_GAME:
            players.player_2.generateBoard();
            if(!players.player_1.getIsAllShipPlaced()){
                return state;
            }
            return {...state, isGameStarted: true}

        case ACTIONS.ATTACK: 
            const hitData = players.player_2.attack(action.payload.row, action.payload.column);
            return {...state, hitData: {...state.hitData, ...hitData}};
        default:
            throw new Error();
    }
}