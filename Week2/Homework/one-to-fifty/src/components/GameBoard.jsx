import styled from '@emotion/styled';
import { useState } from 'react';

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

// 숫자 섞기
function shuffleNumbers(start = 1) {
  const numbers = Array.from({ length: 9 }, (_, index) => start + index);

  for (let i = numbers.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [numbers[i], numbers[randomIndex]] = [
      numbers[randomIndex],
      numbers[i],
    ];
  }

  return numbers;
}

export default function GameBoard({ onStart, onComplete, onReset }) {
  const [numbers, setNumbers] = useState(() => shuffleNumbers());
  const [remainingNumbers, setRemainingNumbers] = useState(() => shuffleNumbers(10));
  const [nextNumber, setNextNumber] = useState(1);

  function handleNumberClick(number, cellIndex) {
    if (number !== nextNumber) return;

    if (number === 1) onStart();
    if (number === 18) {
      onComplete();
      // 종료 알림 확인 후 새 판으로 초기화
      resetGame();
      return;
    }

    // 앞쪽 숫자를 누른 자리에 뒤쪽 숫자를 하나씩 채움
    const replacement = number <= 9 ? remainingNumbers[number - 1] : null;

    setNumbers((previous) => previous.map((value, index) => (
      index === cellIndex ? replacement : value
    )));
    setNextNumber((previous) => previous + 1);
  }

  function resetGame() {
    onReset();
    setNumbers(shuffleNumbers());
    setRemainingNumbers(shuffleNumbers(10));
    setNextNumber(1);
  }

  return (
    <Section aria-labelledby="game-title">
      <h1 id="game-title">1 to 50</h1>
      <p aria-live="polite">
        다음 숫자: <strong>{nextNumber}</strong>
      </p>
      <Board>
        {numbers.map((number, index) => (
          <Cell
            key={index}
            type="button"
            disabled={number === null}
            onClick={() => handleNumberClick(number, index)}
          >
            {number}
          </Cell>
        ))}
      </Board>
    </Section>
  );
}
