import { Game_Board } from "../Game_Board";
import { Ship } from "../Ship";

describe("Tests for game board i.e ship placement, grid attack", () => {
    let gameBoard;
    beforeAll(() => {
        gameBoard = Game_Board();
        gameBoard.initialize();
    });

    it("Game board initial value", () => {
        const rowCheck = (row, callBack) => {
            row.forEach(grid => { callBack(grid) });
        }
        const mockGridObj = jest.fn(gridObj => gridObj);
        const board = gameBoard.getGameBoard();
        board.forEach(row => {
            rowCheck(row, mockGridObj);
        })
        expect(mockGridObj.mock.calls.length).toBe(100);
        for (let i = 0; i < 100; i++) {
            expect(mockGridObj.mock.results[0].value).toEqual({
                isHit: false,
                ship: null
            });
        }
    });

    it("Check grid data from coordinate", () => {
        const gridData = {isHit: false, ship: null}
        expect(gameBoard.getGridData([4,5])).toEqual(gridData);
        expect(gameBoard.getGridData([0,4])).toEqual(gridData);
        expect(gameBoard.getGridData([0,9])).toEqual(gridData);
        expect(gameBoard.getGridData([9,9])).toEqual(gridData);
    });

    it("check ship palcement horizontal", () => {
        expect(gameBoard.placeShip(4, "horizontal", [0,7])).toBeFalsy();
        expect(gameBoard.placeShip(4, "horizontal", [9,7])).toBeFalsy();
        expect(gameBoard.placeShip(1, "horizontal", [0,9])).toBeTruthy();
    });

    it("check ship palcement vertical", () => {
        expect(gameBoard.placeShip(4, "vertical", [7,0])).toBeFalsy();
        expect(gameBoard.placeShip(4, "vertical", [9,7])).toBeFalsy();
        expect(gameBoard.placeShip(1, "vertical", [2,9])).toBeTruthy();
    });

    it("Check ship placement if Neighbour present horizontal", () => {
        const gridData = JSON.stringify({isHit: false, ship: Ship(2)});
        expect(gameBoard.placeShip(2, "horizontal", [3,4])).toBeTruthy();
        expect(JSON.stringify(gameBoard.getGridData([3,4]))).toEqual(gridData);
        expect(JSON.stringify(gameBoard.getGridData([3,5]))).toEqual(gridData);
        expect(gameBoard.placeShip(2, "horizontal", [2,3])).toBeFalsy();
        expect(gameBoard.placeShip(2, "horizontal", [3,3])).toBeFalsy();
        expect(gameBoard.placeShip(2, "horizontal", [4,3])).toBeFalsy();
        expect(gameBoard.placeShip(2, "horizontal", [2,4])).toBeFalsy();
        expect(gameBoard.placeShip(2, "horizontal", [3,4])).toBeFalsy();
        expect(gameBoard.placeShip(2, "horizontal", [4,4])).toBeFalsy();
        expect(gameBoard.placeShip(2, "horizontal", [2,5])).toBeFalsy();
        expect(gameBoard.placeShip(2, "horizontal", [3,5])).toBeFalsy();
        expect(gameBoard.placeShip(2, "horizontal", [4,5])).toBeFalsy();
        expect(gameBoard.placeShip(2, "horizontal", [2,6])).toBeFalsy();
        expect(gameBoard.placeShip(2, "horizontal", [3,6])).toBeFalsy();
        expect(gameBoard.placeShip(2, "horizontal", [4,6])).toBeFalsy();
    });
    it("Check ship placement if Neighbour present vertical", () => {
        const gridData = JSON.stringify({isHit: false, ship: Ship(2)});
        expect(gameBoard.placeShip(2, "vertical", [7,5])).toBeTruthy();
        expect(JSON.stringify(gameBoard.getGridData([7,5]))).toEqual(gridData);
        expect(JSON.stringify(gameBoard.getGridData([8,5]))).toEqual(gridData);
        expect(gameBoard.placeShip(2, "vertical", [6,4])).toBeFalsy();
        expect(gameBoard.placeShip(2, "vertical", [6,5])).toBeFalsy();
        expect(gameBoard.placeShip(2, "vertical", [6,6])).toBeFalsy();
        expect(gameBoard.placeShip(2, "vertical", [7,4])).toBeFalsy();
        expect(gameBoard.placeShip(2, "vertical", [7,5])).toBeFalsy();
        expect(gameBoard.placeShip(2, "vertical", [7,6])).toBeFalsy();
        expect(gameBoard.placeShip(2, "vertical", [8,4])).toBeFalsy();  
        expect(gameBoard.placeShip(2, "vertical", [8,5])).toBeFalsy();
        expect(gameBoard.placeShip(2, "vertical", [8,6])).toBeFalsy();
        expect(gameBoard.placeShip(2, "vertical", [9,4])).toBeFalsy();
        expect(gameBoard.placeShip(2, "vertical", [9,5])).toBeFalsy();
        expect(gameBoard.placeShip(2, "vertical", [9,6])).toBeFalsy();
    });
});