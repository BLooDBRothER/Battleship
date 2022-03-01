import React, { useContext } from 'react';
import { gameDataContext } from './Game';
import { ACTIONS } from './reducer';

const GameOver = () => {
    const [gameData, dispatch] = useContext(gameDataContext);
    const resetGame = () => {
        dispatch({type: ACTIONS.SET_INITIAL});
    }
    const restartGame = () => {
        dispatch({type: ACTIONS.SET_INITIAL});
        dispatch({type: ACTIONS.GENERATE_BOARD});
        dispatch({type: ACTIONS.START_GAME});
    }
    return (
        <>
            <div className='hide'></div>
            <div className='gameover animate__animated animate__fadeIn'>
                <h1>GameOver</h1>
                <h1>{gameData.playerWon} has Own</h1>
                <div className='gameover--options'>
                    <div className='gameover--option' onClick={restartGame}>Restart</div>
                    <div className='gameover--option' onClick={resetGame}>Main Menu</div>
                </div>
            </div>
        </>
    )
}

export default GameOver;