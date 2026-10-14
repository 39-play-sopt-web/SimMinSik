import styled from '@emotion/styled';
import { useState } from 'react';
import { LEVEL_CONFIG } from '../constants/levels';

const Section = styled.section`
  max-width: 420px;
  margin: 40px auto;
  text-align: center;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ size }) => size}, 1fr);
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
  transition: transform 120ms ease, background-color 120ms ease, color 120ms ease;

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background: #e9e4ef;
    }
  }

  &:active:not(:disabled) {
    transform: scale(0.94);
    background: #624589;
    color: #fff;
  }

  &:disabled {
    background: transparent;
    border-color: transparent;
    cursor: default;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:active:not(:disabled) {
      transform: none;
    }
  }
`;

// 숫자 섞기
function shuffleNumbers(count, start = 1) {
  const numbers = Array.from({ length: count }, (_, index) => start + index);

  for (let i = numbers.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [numbers[i], numbers[randomIndex]] = [
      numbers[randomIndex],
      numbers[i],
    ];
  }

  return numbers;
}

export default function GameBoard({ level, onStart, onComplete }) {
  const { size, total } = LEVEL_CONFIG[level];
  const half = total / 2;
  const [numbers, setNumbers] = useState(() => shuffleNumbers(half));
  const [remainingNumbers] = useState(() => shuffleNumbers(half, half + 1));
  const [nextNumber, setNextNumber] = useState(1);

  function handleNumberClick(number, cellIndex) {
    if (number !== nextNumber) return;

    if (number === 1) onStart();
    if (number === total) {
      setNextNumber(total + 1);
      onComplete(Number(level));
      return;
    }

    // 앞쪽 숫자를 누른 자리에 뒤쪽 숫자를 하나씩 채움
    const replacement = number <= half ? remainingNumbers[number - 1] : null;

    setNumbers((previous) => previous.map((value, index) => (
      index === cellIndex ? replacement : value
    )));
    setNextNumber((previous) => previous + 1);
  }

  return (
    <Section aria-labelledby="game-title">
      <h1 id="game-title">1 to 50</h1>
      <p aria-live="polite">
        {nextNumber > total ? '완료!' : <>다음 숫자: <strong>{nextNumber}</strong></>}
      </p>
      <Board size={size}>
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
