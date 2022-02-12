import React, { useContext } from 'react';
import { gameDataContext } from './Game';
import { ACTIONS } from './reducer';

const GameOver = () => {
    const [gameData, dispatch] = useContext(gameDataContext);
    const resetGame = () => {
        dispatch({type: ACTIONS.SET_INITIAL});
    }
    return (
        <>
            <div className='hide'></div>
            <div className='gameover'>
                <h1>GameOver</h1>
                <h1>{gameData.playerWon}</h1>
                <div className='gameover--options'>
                    <div className='gameover--option'>Restart</div>
                    <div className='gameover--option' onClick={resetGame}>Main Menu</div>
                </div>
            </div>
        </>
    )
}

export default GameOver;