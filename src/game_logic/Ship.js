export const Ship = (length, orientation, [...coordinate], shipName) => {
    let life = length;

    const hit = () => {
        life--;
        return isSunk();
    }

    const isSunk = () => {
        return !life;
    }

    const getLife = () => [life, length];

    return {hit, isSunk, getLife, length, orientation, coordinate, shipName};
}