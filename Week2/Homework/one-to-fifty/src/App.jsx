import { useState } from 'react';
import styled from '@emotion/styled';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Ranking from './components/Ranking';
import useTimer from './hooks/useTimer';

const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

export default function App() {
  const [menu, setMenu] = useState('game');
  const [level, setLevel] = useState('1');
  const { elapsedTime, startTimer, stopTimer, resetTimer } = useTimer();

  function handleMenuChange(nextMenu) {
    if (nextMenu === menu) return;
    resetTimer();
    setMenu(nextMenu);
  }

  return (
    <Page>
      <Header
        menu={menu}
        onMenuChange={handleMenuChange}
        level={level}
        onLevelChange={setLevel}
        elapsedTime={elapsedTime}
      />
      <main>
        {menu === 'game' ? (
          <GameBoard onStart={startTimer} onComplete={stopTimer} onReset={resetTimer} />
        ) : <Ranking />}
      </main>
    </Page>
  );
}
