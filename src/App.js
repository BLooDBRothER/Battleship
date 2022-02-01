import React from 'react';
import Game from './components/game/Game';
import Header from './components/Header';
import BgSVG from './components/utils/BgSVG';


function App() {
  return (
    <>
      <Header />
      <BgSVG />
      <Game />
    </>
  );
}

export default App;
