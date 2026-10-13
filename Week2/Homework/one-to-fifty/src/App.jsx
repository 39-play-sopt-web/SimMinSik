import { useState } from 'react';
import styled from '@emotion/styled';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Ranking from './components/Ranking';
import useTimer from './hooks/useTimer';
import { saveGameRecord } from './utils/gameRecords';

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

  function handleGameComplete(completedLevel) {
    const finalTime = stopTimer();
    let message = `게임 완료! 걸린 시간: ${finalTime.toFixed(2)}초`;

    try {
      saveGameRecord(completedLevel, finalTime);
    } catch {
      message += '\n기록을 저장하지 못했습니다.';
    }

    window.alert(message);
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
          <GameBoard onStart={startTimer} onComplete={handleGameComplete} onReset={resetTimer} />
        ) : <Ranking />}
      </main>
    </Page>
  );
}
