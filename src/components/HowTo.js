import React, { useEffect, useState } from 'react';
import { MdLiveHelp } from 'react-icons/md';
import arrangement_img from '../assets/how to/arrangement.png';
import gameplay_img from '../assets/how to/gameplay.png';
import { FaSkullCrossbones, FaHeart } from 'react-icons/fa';
import { GiCrossMark } from 'react-icons/gi';
import { BsShieldFillX } from 'react-icons/bs';

const HowTo = ({setEnableOverflow}) => {
    const [toDisplay, setToDisplay] = useState(false);
    useEffect(() => {
        setEnableOverflow(toDisplay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toDisplay])
    return (
        <>
            <MdLiveHelp className='help--ic' onClick={() => { setToDisplay(prev => !prev) }} />
            {toDisplay &&
                <div className='how-to animate__animated animate__fadeIn'>
                    <div className='how-to--arrangement'>
                        <h1>Ship Arrangement</h1>
                        <div className='how-to--wrapper'>
                            <img src={arrangement_img} className='how-to--img arrangement-img' alt='arrangement' />
                            <div className='how-to--content'>
                                <p>
                                The first thing is to place your ship on the board. There are two ways to place the ship.
                                </p>
                                <ul className='center'>
                                    <li className='highlight'>Drag And Drop</li>
                                    <li className='highlight'>Randomize</li>
                                </ul>
                                <p className='highlight'>
                                    Rules to place a Ship
                                </p>
                                <ul>
                                    <li>You can place your ship either horizontally or vertically. Diagonal placement is not allowed.</li>
                                    <li>You cannot place your ship to the next grid of an already placed ship.</li>
                                </ul>
                                <p className='highlight'>* Drag and Drop is not supported for mobile. So kindly use randomize option to place the ship.</p>
                            </div>
                        </div>
                    </div>
                    <div className='how-to--arrangement'>
                        <h1>GamePlay</h1>
                        <div className='how-to--wrapper'>
                            <div className='how-to--content'>
                                <p>As the game starts player has to choose the coordinate to hit the computer's board. Next, the computer attacks the player board. It gets repeated till all the ship has sunk.</p>
                                <p className='highlight'>ICONS in the Board</p>
                                <ul className='how-to--ic-list'>
                                    <li><FaSkullCrossbones className='how-to--ic green' /> - Indicates the part of the ship has hit.</li>
                                    <li><GiCrossMark className='how-to--ic red' /> - Indicates that the place does not contains ship.</li>
                                    <li><BsShieldFillX className='how-to--ic blue' /> - Indicates the Surrounding of the ship.</li>
                                    <li><FaHeart className='how-to--ic red' /> - Indicates the life of the Ship.</li>
                                </ul>
                                <p className='highlight'>* Computer Moves is based on AI so it plays like a human.</p>
                            </div>
                            <img src={gameplay_img} alt='gameplay' className='how-to--img gameplay-img'/>
                        </div>
                    </div>
                    <p className='rule-link-p'><a className='rule-link' href="https://en.wikipedia.org/wiki/Battleship_(game)" target="_blank" rel="noreferrer">Wikipedia</a></p>
                </div>
            }
        </>
    )
}

export default HowTo;