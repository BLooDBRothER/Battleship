import { Game_Board } from '../../game_logic/Game_Board';

export const playerData = Game_Board();

export const ACTIONS = {
    ADD_SHIP: "add_ship",
    ROTATE_SHIP: "rotate_ship"
}

export function reducer(state, action){
    switch(action.type){
        case ACTIONS.ADD_SHIP:
            playerData.assignShipCoordinates(action.payload.length, action.payload.orientation, action.payload.coordinate, action.payload.shipName);
            console.log(playerData.getShipData());
            return {...state, shipData:{...state.shipData, player: playerData.getShipData()}};
        
        default:
            throw new Error();
    }
}