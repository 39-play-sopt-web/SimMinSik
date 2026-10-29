import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const Dialog = styled.dialog`
  width: min(400px, calc(100% - 32px));
  padding: 32px;
  border: 0;
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  box-shadow: 0 16px 48px ${({ theme }) => theme.colors.shadow};

  &::backdrop {
    background: ${({ theme }) => theme.colors.backdrop};
  }

  @media (width <= 480px) {
    padding: 24px;
  }
`;

const Time = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 32px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

const ConfirmButton = styled.button`
  width: 100%;
  margin-top: 16px;
  padding: 12px 16px;
  border: 0;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
`;

export default function ResultModal({ result, onConfirm, returnFocusRef }) {
  const dialogRef = useRef(null);
  const confirmRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const returnFocusTarget = returnFocusRef.current;
    dialog.showModal();
    confirmRef.current.focus();

    return () => {
      dialog.close();
      returnFocusTarget?.focus();
    };
  }, [returnFocusRef]);

  return createPortal(
    <Dialog
      ref={dialogRef}
      aria-labelledby="result-title"
      aria-describedby="result-description"
      onCancel={(event) => {
        event.preventDefault();
        onConfirm();
      }}
    >
      <h2 id="result-title">게임 완료!</h2>
      <p id="result-description">Level {result.level}을 완료했습니다.</p>
      <Time>{result.playTime.toFixed(2)}초</Time>
      {result.saveError && <p role="alert">{result.saveError}</p>}
      <ConfirmButton ref={confirmRef} type="button" onClick={onConfirm}>
        확인
      </ConfirmButton>
    </Dialog>,
    document.body,
  );
}
