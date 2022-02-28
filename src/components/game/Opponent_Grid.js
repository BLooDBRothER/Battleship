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
    // if(!type) return;
    !type ? setHitType("") : setHitType(type);
    // setHitType(type);
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
      {hitType === "shipHit" && <div className='grid-ic--cnt'><FaSkullCrossbones className='grid-ic--normal grid-ic--pass animate__animated animate__bounceIn animate__faster' /></div>}
      {hitType === "missHit"  && <div className='grid-ic--cnt'><GiCrossMark className='grid-ic--normal grid-ic--fail faded animate__animated animate__headShake animate__faster' /></div>}
      {hitType === "surroundHit"  && <div className='grid-ic--cnt'><BsShieldFillX className='grid-ic--normal grid-ic--shield animate__animated aanimate__bounceIn animate__faster' /></div>}
    </div>
    )
};

export default OpponentGrid;