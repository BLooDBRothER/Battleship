export const Ship = (length, orientation, [...coordinate], name) => {
    let life = length;

    const hit = () => {
        life--;
        return isSunk();
    }

    const isSunk = () => {
        return !life;
    }

    return {hit, isSunk, length, orientation, coordinate, name};
}