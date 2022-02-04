import React, { useContext } from 'react';
import { GiSwordsEmblem } from 'react-icons/gi';
import { FaRandom } from 'react-icons/fa';
import { gameDataContext } from '../game/Game';
import { ACTIONS } from '../game/reducer';

const Menu = () => {
  const dispatch = useContext(gameDataContext)[1];

  const generateRandomBoard = () => {
    dispatch({type: ACTIONS.GENERATE_BOARD});
    const shipContainer = document.querySelector(".game-ships");
    const shipGroups = document.querySelectorAll(".game-ships--group");
    shipGroups.forEach(shipElement => shipContainer.removeChild(shipElement));
  }

  return (
      <div className='game-menu'>
        <div className='game-menu--option'><GiSwordsEmblem className="game-menu--option-ic" />START GAME</div>
        <div className='game-menu--option' onClick={generateRandomBoard}><FaRandom className="game-menu--option-ic" />RANDOMIZE ARRANGEMENT</div>
      </div>
  );
};

export default Menu;
