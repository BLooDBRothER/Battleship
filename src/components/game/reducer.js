import { Game_Board } from '../../game_logic/Game_Board';

export const player_1_Data = Game_Board();
export const player_2_Data = Game_Board();

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
            player_1_Data.assignShipCoordinates(action.payload.length, action.payload.orientation, action.payload.coordinate, action.payload.shipName);
            return {...state, board: {...state.board, player_1: player_1_Data.getGameBoard()}, shipData:{...state.shipData, player: player_1_Data.getShipData()}};
        
        case ACTIONS.ROTATE_SHIP:
            player_1_Data.removeShip(action.payload.shipName);
            if(!player_1_Data.placeShip(action.payload.length, action.payload.toggleOrientation, action.payload.coordinate)){
                player_1_Data.assignShipCoordinates(action.payload.length, action.payload.currentOrientation, action.payload.coordinate, action.payload.shipName);
                return state;
            }
            else{
                player_1_Data.assignShipCoordinates(action.payload.length, action.payload.toggleOrientation, action.payload.coordinate, action.payload.shipName);
            }
            return {...state, board: {...state.board, player_1: player_1_Data.getGameBoard()}, shipData:{...state.shipData, player: player_1_Data.getShipData()}};

        case ACTIONS.GENERATE_BOARD:
            player_1_Data.generateBoard();
            return {...state, board: {...state.board, player_1: player_1_Data.getGameBoard()}, shipData:{...state.shipData, player: player_1_Data.getShipData()}};
        
        case ACTIONS.START_GAME:
            player_2_Data.generateBoard();
            if(!player_1_Data.getIsAllShipPlaced()){
                return state;
            }
            return {...state, board: {...state.board, player_2: player_2_Data.getGameBoard()}, isGameStarted: true}

        case ACTIONS.ATTACK: 
            player_2_Data.attack(action.payload.row, action.payload.column);
            // console.log(player_2_Data.getGameBoard([action.payload.row, action.payload.column]));
            return {...state, board: {...state.board, player_2: player_2_Data.getGameBoard()}};
        default:
            throw new Error();
    }
}