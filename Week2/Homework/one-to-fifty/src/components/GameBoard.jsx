import styled from '@emotion/styled';

const Section = styled.section`
  max-width: 420px;
  margin: 40px auto;
  text-align: center;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 24px;
`;

const Cell = styled.button`
  aspect-ratio: 1;
  border: 1px solid #ded9e6;
  border-radius: 12px;
  background: #fff;
  color: #624589;
  font-size: 28px;
  font-weight: 700;
`;

// 숫자 배치와 클릭 로직은 다음 단계에서 연결
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function GameBoard() {
  return (
    <Section aria-labelledby="game-title">
      <h1 id="game-title">1 to 50</h1>
      <p>다음 숫자: <strong>1</strong></p>
      <Board>
        {numbers.map((number) => <Cell key={number} type="button">{number}</Cell>)}
      </Board>
    </Section>
  );
}
