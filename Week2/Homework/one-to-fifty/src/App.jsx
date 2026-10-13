import { useState } from 'react';
import styled from '@emotion/styled';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Ranking from './components/Ranking';

const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

export default function App() {
  const [menu, setMenu] = useState('game');
  const [level, setLevel] = useState('1');

  return (
    <Page>
      <Header
        menu={menu}
        onMenuChange={setMenu}
        level={level}
        onLevelChange={setLevel}
      />
      <main>
        {menu === 'game' ? <GameBoard /> : <Ranking />}
      </main>
    </Page>
  );
}
