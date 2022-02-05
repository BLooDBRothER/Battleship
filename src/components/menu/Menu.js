import React, { useContext } from 'react';
import { GiSwordsEmblem } from 'react-icons/gi';
import { FaRandom } from 'react-icons/fa';
import { gameDataContext } from '../game/Game';
import { ACTIONS } from '../game/reducer';

const Menu = () => {
  const dispatch = useContext(gameDataContext)[1];

  const generateRandomBoard = () => {
    dispatch({type: ACTIONS.GENERATE_BOARD});
    const shipGroups = document.querySelectorAll(".game-ships--group");
    let time = 0;
    shipGroups.forEach(shipElement => {
      setTimeout(() => {
        shipElement.className += "animate_animated animate__bounceOut"
      }, time);
      time += 70;
    });
  }

  return (
      <div className='game-menu'>
        <div className='game-menu--option'><GiSwordsEmblem className="game-menu--option-ic" />START GAME</div>
        <div className='game-menu--option' onClick={generateRandomBoard}><FaRandom className="game-menu--option-ic" />RANDOMIZE ARRANGEMENT</div>
      </div>
  );
};

export default Menu;
