import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Ranking from './components/Ranking';
import ResultModal from './components/ResultModal';
import useTimer from './hooks/useTimer';
import { saveGameRecord } from './utils/gameRecords';

const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: clamp(16px, 4vw, 24px);
`;

export default function App() {
  const levelSelectRef = useRef(null);
  const [menu, setMenu] = useState('game');
  const [level, setLevel] = useState(1);
  const [result, setResult] = useState(null);
  const [gameId, setGameId] = useState(0);
  const { elapsedTime, startTimer, stopTimer, resetTimer } = useTimer();

  function handleMenuChange(nextMenu) {
    if (nextMenu === menu) return;
    resetTimer();
    setMenu(nextMenu);
  }

  function handleGameComplete(completedLevel) {
    const finalTime = stopTimer();
    if (finalTime === null) return;

    let saveError = '';

    try {
      saveGameRecord(completedLevel, finalTime);
    } catch {
      saveError = '기록을 저장하지 못했습니다.';
    }

    setResult({ level: completedLevel, playTime: finalTime, saveError });
  }

  function handleResultConfirm() {
    resetTimer();
    setResult(null);
    setGameId((previous) => previous + 1);
  }

  function handleLevelChange(nextLevel) {
    if (nextLevel === level) return;
    resetTimer();
    setLevel(nextLevel);
  }

  return (
    <Page>
      <Header
        menu={menu}
        onMenuChange={handleMenuChange}
        level={level}
        onLevelChange={handleLevelChange}
        elapsedTime={elapsedTime}
        levelSelectRef={levelSelectRef}
      />
      <main>
        {menu === 'game' ? (
          <GameBoard
            key={`${level}-${gameId}`}
            level={level}
            onStart={startTimer}
            onComplete={handleGameComplete}
          />
        ) : <Ranking />}
      </main>
      {result && (
        <ResultModal
          result={result}
          onConfirm={handleResultConfirm}
          returnFocusRef={levelSelectRef}
        />
      )}
    </Page>
  );
}
