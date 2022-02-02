import { Ship } from "../Ship"

describe("Ship factory function test that returns whether ship has sunk or not", () => {
    const battleShip = Ship(4);
    const submarine = Ship(2);

    it("To destroy battleship", () => {
        expect(battleShip.hit()).toBeFalsy();
        expect(battleShip.hit()).toBeFalsy();
        expect(battleShip.hit()).toBeFalsy();
        expect(battleShip.hit()).toBeTruthy();
    });

    it("To destroy submarine", () => {
        expect(submarine.hit()).toBeFalsy();
        expect(submarine.hit()).toBeTruthy();
    })
})