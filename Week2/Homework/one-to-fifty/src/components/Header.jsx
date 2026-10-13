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

const MenuButton = styled.button`
  padding: 10px 16px;
  border: 0;
  border-radius: 8px;
  background: ${({ selected }) => selected ? '#624589' : '#e9e4ef'};
  color: ${({ selected }) => selected ? '#fff' : '#292433'};
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
`;

export default function Header({ menu, onMenuChange, level, onLevelChange }) {
  return (
    <Container>
      <Group as="nav" aria-label="메인 메뉴">
        <MenuButton selected={menu === 'game'} aria-pressed={menu === 'game'} onClick={() => onMenuChange('game')}>
          게임
        </MenuButton>
        <MenuButton selected={menu === 'ranking'} aria-pressed={menu === 'ranking'} onClick={() => onMenuChange('ranking')}>
          랭킹
        </MenuButton>
      </Group>
      {menu === 'game' && (
        <Group>
          <label htmlFor="level">레벨</label>
          <LevelSelect id="level" value={level} onChange={(event) => onLevelChange(event.target.value)}>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
          </LevelSelect>
          <Timer aria-label="플레이 시간">0.00초</Timer>
        </Group>
      )}
    </Container>
  );
}
