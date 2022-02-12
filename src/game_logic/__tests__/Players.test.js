import { Players } from "../Players";

describe("player logic", () => {
    let players = Players();

    beforeAll(() => {
        players.player_1.generateBoard();
        players.player_2.generateBoard();
    });

    it('observe player turn change', () => {
        expect(players.changeTurn()).toBe('player_2');
        expect(players.changeTurn()).toBe('player_1');
    });

    it('players ship life before', () => {
        const expectData = {
            player_1:{
                battleship_0: [4, 4],
                boat_0: [1, 1],
                boat_1: [1, 1],
                boat_2: [1, 1],
                boat_3: [1, 1],
                cruiser_0: [3, 3],
                cruiser_1: [3, 3],
                submarine_0: [2, 2],
                submarine_1: [2, 2],
                submarine_2: [2, 2],
        },
            player_2:{
                battleship_0: [4, 4],
                boat_0: [1, 1],
                boat_1: [1, 1],
                boat_2: [1, 1],
                boat_3: [1, 1],
                cruiser_0: [3, 3],
                cruiser_1: [3, 3],
                submarine_0: [2, 2],
                submarine_1: [2, 2],
                submarine_2: [2, 2],
        }};
        expect(players.createShipLifeData()).toEqual(expectData);
    });

    it('observe computer attack', () => {
        const recursiveAttack = () => {
            const remainingMoves = players.computerAttack();
            if(remainingMoves === 0){
                return true;
            }
            return recursiveAttack();   
        }
        expect(recursiveAttack()).toBeTruthy();
    });

    it('players ship life after attack', () => {
        const expectData = {
            player_1:{
                battleship_0: [0, 4],
                boat_0: [0, 1],
                boat_1: [0, 1],
                boat_2: [0, 1],
                boat_3: [0, 1],
                cruiser_0: [0, 3],
                cruiser_1: [0, 3],
                submarine_0: [0, 2],
                submarine_1: [0, 2],
                submarine_2: [0, 2],
        },
            player_2:{
                battleship_0: [4, 4],
                boat_0: [1, 1],
                boat_1: [1, 1],
                boat_2: [1, 1],
                boat_3: [1, 1],
                cruiser_0: [3, 3],
                cruiser_1: [3, 3],
                submarine_0: [2, 2],
                submarine_1: [2, 2],
                submarine_2: [2, 2],
        }};
        expect(players.createShipLifeData()).toEqual(expectData);
    });

});