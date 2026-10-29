import styled from '@emotion/styled';

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 24px;
  border-bottom: 1px solid #ded9e6;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const GameControls = styled(Group)`
  @media (width <= 480px) {
    width: 100%;
    justify-content: space-between;
    gap: 8px;
  }
`;

const MenuButton = styled.button`
  padding: 10px 16px;
  border: 0;
  border-radius: 8px;
  background: #e9e4ef;
  color: #292433;

  &[aria-pressed='true'] {
    background: #624589;
    color: #fff;
  }
`;

const LevelSelect = styled.select`
  padding: 8px;
  border: 1px solid #ded9e6;
  border-radius: 8px;
  background: #fff;
`;

const Timer = styled.output`
  min-width: 72px;
  font-variant-numeric: tabular-nums;
  text-align: right;
  white-space: nowrap;
`;

export default function Header({
  menu,
  onMenuChange,
  level,
  onLevelChange,
  elapsedTime,
  levelSelectRef,
}) {
  return (
    <Container>
      <Group as="nav" aria-label="메인 메뉴">
        <MenuButton
          aria-pressed={menu === 'game'}
          onClick={() => onMenuChange('game')}
        >
          게임
        </MenuButton>
        <MenuButton
          aria-pressed={menu === 'ranking'}
          onClick={() => onMenuChange('ranking')}
        >
          랭킹
        </MenuButton>
      </Group>
      {menu === 'game' && (
        <GameControls>
          <label htmlFor="level">레벨</label>
          <LevelSelect
            ref={levelSelectRef}
            id="level"
            value={level}
            onChange={(event) => onLevelChange(Number(event.target.value))}
          >
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
          </LevelSelect>
          <Timer role="timer" aria-label="플레이 시간">
            {elapsedTime.toFixed(2)}초
          </Timer>
        </GameControls>
      )}
    </Container>
  );
}
