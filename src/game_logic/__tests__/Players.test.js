import { players } from "../Players";

describe("player logic", () => {

    beforeAll(() => {
        players.player_2.generateBoard();
        const recursiveAttack = () => {
            const remainingMoves = players.computerAttack();
            if(remainingMoves === 0){
                return;
            }
            recursiveAttack();   
        }
        recursiveAttack();
    });

    it('observe player turn change', () => {
        expect(players.changeTurn()).toBe('player_2');
        expect(players.changeTurn()).toBe('player_1');
    })

    it('observe computer attack', () => {

    });

});