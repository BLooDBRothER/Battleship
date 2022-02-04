export const Ship = (length, orientation, [...coordinate]) => {
    let life = length;

    const hit = () => {
        life--;
        return isSunk();
    }

    const isSunk = () => {
        return !life;
    }

    return {hit, length, orientation, coordinate};
}