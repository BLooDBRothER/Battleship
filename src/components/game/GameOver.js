import React from 'react';

const GameOver = ({ playerWon }) => {
    return (
        <>
            <div className='hide'></div>
            <div className='gameover'>
                <h1>GameOver</h1>
                <h1>{playerWon}</h1>
                <div className='gameover--options'>
                    <div className='gameover--option'>Restart</div>
                    <div className='gameover--option'>Main Menu</div>
                </div>
            </div>
        </>
    )
}

export default GameOver;