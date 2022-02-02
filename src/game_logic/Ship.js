export const Ship = (length) => {
    let life = length;

    const hit = () => {
        life--;
        return isSunk();
    }

    const isSunk = () => {
        return !life;
    }

    return {hit}
}