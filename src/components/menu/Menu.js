import React, { useContext, useEffect, useRef, useState } from 'react';
import { GiSwordsEmblem } from 'react-icons/gi';
import { FaRandom, FaEdit } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import { gameDataContext } from '../game/Game';
import { ACTIONS } from '../game/reducer';

const Menu = () => {
  const dispatch = useContext(gameDataContext)[1];

  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(localStorage.getItem('playerName') || 'Player');
  const nameRef = useRef(null);
  const changeFocusRef = useRef(null);

  useEffect(() => {
    if(!isEditing) {
      const newName = playerName.split(' ').join().length === 0 ? 'Player' : playerName.split(' ').join('');
      setPlayerName(newName);
      nameRef.current.blur();
      localStorage.setItem('playerName', newName);
      return;
    }
    nameRef.current.focus();
  }, [isEditing, playerName]);

  const generateRandomBoard = () => {
    dispatch({type: ACTIONS.GENERATE_BOARD});
    const shipGroups = document.querySelectorAll(".game-ships--group");
    let time = 0;
    shipGroups.forEach(shipElement => {
      setTimeout(() => {
        shipElement.classList.add("animate_animated", "animate__bounceOut");
      }, time);
      time += 70;
    });
  }

  const startGame = () => {
    dispatch({type: ACTIONS.START_GAME});
  }
  
  const changeName = (e) => {
    if(e.target.value.length > 8) return;
    setPlayerName(e.target.value);
  } 

  const toggleEditable = (e) => {
    e.preventDefault();
    setIsEditing(prev => !prev);
  }

  return (
      <div className='game-menu' ref={changeFocusRef}>
        <div className='player_name'>
          <h1 className='player_name--greeting'>Welcome,</h1>
          <form onSubmit={toggleEditable}><input type='text' value={playerName} onClick={() => {if(!isEditing){nameRef.current.blur()}}} readOnly={!isEditing} className='player_name--value' ref={nameRef} onChange={changeName} /></form>
          {isEditing ? <TiTick className='player_name--ic' onClick={toggleEditable}/> : <FaEdit className='player_name--ic' onClick={toggleEditable} />}
        </div>
        <div className='game-menu--option' onClick={startGame}><GiSwordsEmblem className="game-menu--option-ic" />START GAME</div>
        <div className='game-menu--option' onClick={generateRandomBoard}><FaRandom className="game-menu--option-ic" />RANDOMIZE ARRANGEMENT</div>
      </div>
  );
};

export default Menu;
