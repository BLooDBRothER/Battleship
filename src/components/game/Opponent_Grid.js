import React, { useState, useEffect, useContext } from 'react';
import { FaSkullCrossbones } from 'react-icons/fa';
import { GiCrossMark } from 'react-icons/gi';
import { BiCrosshair } from 'react-icons/bi';
import { VscDebugBreakpointLog } from 'react-icons/vsc';
import { BsShieldFillX } from 'react-icons/bs';
import { gameDataContext } from './Game';
import { ACTIONS,  } from './reducer';

const OpponentGrid = ({ row, column }) => {

  const [gameData, dispatch] = useContext(gameDataContext);
  const [hitType, setHitType] = useState("");

  useEffect(() => {
    const type = gameData.hitData[`${row}${column}`];
    if(!type) return;
    setHitType(type);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData.hitData]);

  const attack = (e) => {
    if(gameData.currentPlayer !== 'player_1') return;
    dispatch({type: ACTIONS.ATTACK, payload: {row, column}});
  }

  return (
    <div 
     id={`grid-${row}-${column}`}
     className='game-board--grid' 
     onClick = {hitType === "" ? attack : null}
     >
      {hitType === "" && <VscDebugBreakpointLog className='grid-ic grid-ic--pointer' />}
      {hitType === "" && <BiCrosshair className='grid-ic grid-ic--crosshair' />}
      {hitType === "shipHit" && <FaSkullCrossbones className='grid-ic grid-ic--pass' />}
      {hitType === "missHit"  && <GiCrossMark className='grid-ic grid-ic--fail faded' />}
      {hitType === "surroundHit"  && <BsShieldFillX className='grid-ic grid-ic--shield' />}
    </div>
    )
};

export default OpponentGrid;