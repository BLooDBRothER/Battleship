import React, { useState } from 'react';
import { FaGithubAlt, FaLinkedin } from 'react-icons/fa';

const Credit = () => {
    const [toDisplay, setToDisplay] = useState(false);

    return (
        <>
            <h3 className='credit-btn' onClick={() => {setToDisplay(prev => !prev)}}>CREDIT</h3>
            {toDisplay && 
            <div className='credit animate__animated animate__fadeIn'>
                <h2>Thanks To</h2>
                <ul className='credit-list'>
                    <li><a href="https://fontawesome.com/" target="_blank" rel="noreferrer">Font Awesome</a></li>
                    <li><a href="https://game-icons.net/" target="_blank" rel="noreferrer">Game Icons</a></li>
                    <li><a href="https://github.com/twbs/icons" target="_blank" rel="noreferrer">Bootstrap Icons</a></li>
                    <li><a href="http://google.github.io/material-design-icons/" target="_blank" rel="noreferrer">Material Design Icons</a></li>
                </ul>
                <h2>My Profile</h2>
                <div className='credit-my-profile'>
                    <a href='https://github.com/bloodbrother' target="_blank" rel="noreferrer"><FaGithubAlt className='credit--ic animate__animated animate__tada animate__delay-1s' /></a>
                    <a href='https://www.linkedin.com/in/arul-murugavel/' target="_blank" rel="noreferrer"><FaLinkedin className='credit--ic animate__animated animate__tada animate__delay-1s' /></a>
                </div>
            </div>
            }
        </>
    )
}

export default Credit;