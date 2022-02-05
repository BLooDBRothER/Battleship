import { Game_Board } from "../Game_Board";
import { Ship } from "../Ship";

describe("Tests for game board i.e ship placement, grid attack", () => {
    let gameBoard;
    beforeAll(() => {
        gameBoard = Game_Board();
    });

    it("Game board initial value", () => {
        const rowCheck = (row, callBack) => {
            row.forEach(grid => { callBack(grid) });
        }
        const mockGridObj = jest.fn(gridObj => gridObj);
        const board = gameBoard.getGameBoard();
        board.forEach(row => {
            rowCheck(row, mockGridObj);
        });
        expect(mockGridObj.mock.calls.length).toBe(100);
        for (let i = 0; i < 100; i++) {
            expect(mockGridObj.mock.results[0].value).toEqual({
                isHit: false,
                isSurroundHit: false,
                ship: null
            });
        }
    });

    it("Check grid data from coordinate", () => {
        const gridData = {isHit: false, isSurroundHit: false, ship: null}
        expect(gameBoard.getGridData([4,5])).toEqual(gridData);
        expect(gameBoard.getGridData([0,4])).toEqual(gridData);
        expect(gameBoard.getGridData([0,9])).toEqual(gridData);
        expect(gameBoard.getGridData([9,9])).toEqual(gridData);
    });

    it("check ship palcement horizontal", () => {
        expect(gameBoard.assignShipCoordinates(4, "horizontal", [0,7], "battleship_0")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(4, "horizontal", [9,7], "battleship_0")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(3, "horizontal", [0,5], "cruiser_0")).toBeTruthy();
    });

    it("check ship palcement vertical", () => {
        expect(gameBoard.assignShipCoordinates(4, "vertical", [7,0], "battleship_1")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(4, "vertical", [9,7], "battleship_1")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(3, "vertical", [2,9], "cruiser_1")).toBeTruthy();
    });

    it("Check ship placement if Neighbour present horizontal", () => {
        const gridData = JSON.stringify({isHit: false, isSurroundHit:false, ship: Ship(2, "horizontal", [3,4])});

        expect(gameBoard.assignShipCoordinates(2, "horizontal", [3,4], "submarine_0")).toBeTruthy();
        
        expect(JSON.stringify(gameBoard.getGridData([3,4]))).toEqual(gridData);
        expect(JSON.stringify(gameBoard.getGridData([3,5]))).toEqual(gridData);

        // Check for neighbour and overlap placement
        expect(gameBoard.assignShipCoordinates(2, "horizontal", [2,3], "submarnie_2")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "horizontal", [3,3], "submarnie_2")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "horizontal", [4,3], "submarnie_2")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "horizontal", [2,4], "submarnie_2")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "horizontal", [3,4], "submarnie_2")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "horizontal", [4,4], "submarnie_2")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "horizontal", [2,5], "submarnie_2")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "horizontal", [3,5], "submarnie_2")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "horizontal", [4,5], "submarnie_2")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "horizontal", [2,6], "submarnie_2")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "horizontal", [3,6], "submarnie_2")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "horizontal", [4,6], "submarnie_2")).toBeFalsy();
    });
    it("Check ship placement if Neighbour present vertical", () => {
        const gridData = JSON.stringify({isHit: false, isSurroundHit:false, ship: Ship(2, "vertical", [7,5])});

        expect(gameBoard.assignShipCoordinates(2, "vertical", [7,5], "submarine_1")).toBeTruthy();
        expect(gameBoard.getIsAllShipPlaced()).toBeFalsy();

        expect(JSON.stringify(gameBoard.getGridData([7,5]))).toEqual(gridData);
        expect(JSON.stringify(gameBoard.getGridData([8,5]))).toEqual(gridData);

        // Check for neighbour and overlap placement
        expect(gameBoard.assignShipCoordinates(2, "vertical", [6,4], "submarnie_3")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "vertical", [6,5], "submarnie_3")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "vertical", [6,6], "submarnie_3")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "vertical", [7,4], "submarnie_3")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "vertical", [7,5], "submarnie_3")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "vertical", [7,6], "submarnie_3")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "vertical", [8,4], "submarnie_3")).toBeFalsy();  
        expect(gameBoard.assignShipCoordinates(2, "vertical", [8,5], "submarnie_3")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "vertical", [8,6], "submarnie_3")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "vertical", [9,4], "submarnie_3")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "vertical", [9,5], "submarnie_3")).toBeFalsy();
        expect(gameBoard.assignShipCoordinates(2, "vertical", [9,6], "submarnie_3")).toBeFalsy();
    });

    it("remove ship", () => {
        const gridObj = JSON.stringify({isHit: false, isSurroundHit:false, ship: null});
        gameBoard.removeShip("cruiser_0");
        gameBoard.removeShip("cruiser_1");
        expect(gameBoard.getIsAllShipPlaced()).toBeFalsy();
        expect(JSON.stringify(gameBoard.getGridData([0,5]))).toEqual(gridObj);
        expect(JSON.stringify(gameBoard.getGridData([0,6]))).toEqual(gridObj);
        expect(JSON.stringify(gameBoard.getGridData([0,7]))).toEqual(gridObj);
        expect(JSON.stringify(gameBoard.getGridData([2,9]))).toEqual(gridObj);
        expect(JSON.stringify(gameBoard.getGridData([3,9]))).toEqual(gridObj);
        expect(JSON.stringify(gameBoard.getGridData([4,9]))).toEqual(gridObj);
    });

    it("Missed Attack ship", () => {
        const missedGridData = JSON.stringify({isHit: true, isSurroundHit:false, ship:null});
        gameBoard.attack(0, 0);
        expect(JSON.stringify(gameBoard.getGridData([0,0]))).toEqual(missedGridData);
    });

    it("Hit Attack Ship", () => {
        const hitGridData = JSON.stringify({isHit: true, isSurroundHit:false, ship: Ship(2, "vertical", [7,5])});
        gameBoard.attack(7, 5);
        expect(JSON.stringify(gameBoard.getGridData([7,5]))).toEqual(hitGridData);
    });

    it("Surround Attack Ship", () => {
        const surroundGridData = JSON.stringify({isHit: true, isSurroundHit:true, ship:null});
        expect(JSON.stringify(gameBoard.getGridData([6,4]))).toEqual(surroundGridData);
        expect(JSON.stringify(gameBoard.getGridData([6,6]))).toEqual(surroundGridData);
        expect(JSON.stringify(gameBoard.getGridData([8,4]))).toEqual(surroundGridData);
        expect(JSON.stringify(gameBoard.getGridData([8,6]))).toEqual(surroundGridData);
    })
});

describe("Check random generation", () => {
    let gameBoard;
    beforeAll(() => {
        gameBoard = Game_Board();
    });
    it("Gnereate board i.e random ship placement", () => {
        expect(gameBoard.generateBoard()).toBeTruthy();
        expect(gameBoard.getIsAllShipPlaced()).toBeTruthy();
    });
})