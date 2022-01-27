import React from 'react';
import {RiShip2Fill} from 'react-icons/ri';

const Header = () => {
  return (
    <header className='header'>
        <h1 className='header--title'>Battle<RiShip2Fill className='ship-ic' />Ship</h1>
    </header>
  );
};

export default Header;
