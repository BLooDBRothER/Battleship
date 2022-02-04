import { Game_Board } from '../../game_logic/Game_Board';

export const playerData = Game_Board();

export const ACTIONS = {
    ADD_SHIP: "add_ship",
    ROTATE_SHIP: "rotate_ship",
    GENERATE_BOARD: "generate_board"
}

export function reducer(state, action){
    switch(action.type){
        case ACTIONS.ADD_SHIP:
            playerData.assignShipCoordinates(action.payload.length, action.payload.orientation, action.payload.coordinate, action.payload.shipName);
            return {...state, shipData:{...state.shipData, player: playerData.getShipData()}};
        
        case ACTIONS.ROTATE_SHIP:
            playerData.removeShip(action.payload.shipName);
            if(!playerData.placeShip(action.payload.length, action.payload.toggleOrientation, action.payload.coordinate)){
                playerData.assignShipCoordinates(action.payload.length, action.payload.currentOrientation, action.payload.coordinate, action.payload.shipName);
                return state;
            }
            else{
                playerData.assignShipCoordinates(action.payload.length, action.payload.toggleOrientation, action.payload.coordinate, action.payload.shipName);
            }
            return {...state, shipData:{...state.shipData, player: playerData.getShipData()}};

        case ACTIONS.GENERATE_BOARD:
            playerData.generateBoard();
            return {...state, shipData:{...state.shipData, player: playerData.getShipData()}};
        
        default:
            throw new Error();
    }
}