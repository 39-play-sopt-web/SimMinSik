import styled from '@emotion/styled';
import { useState } from 'react';
import { clearGameRecords, loadGameRecords } from '../utils/gameRecords';

const Section = styled.section`
  padding: 40px 0;
  text-align: center;

  @media (width <= 480px) {
    padding: 24px 0;
  }
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
`;

const ResetButton = styled.button`
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }) => theme.colors.subtle};
    }
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 3px;
  }
`;

const Table = styled.table`
  width: 100%;
  min-width: 520px;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.surface};

  th, td {
    padding: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    white-space: nowrap;
  }

  th {
    background: ${({ theme }) => theme.colors.subtle};
  }

  td:last-child {
    font-variant-numeric: tabular-nums;
  }

  @media (width <= 480px) {
    th, td {
      padding: 12px;
      font-size: 14px;
    }
  }
`;

export default function Ranking() {
  const [{ records, error }, setRanking] = useState(() => {
    try {
      return { records: loadGameRecords(), error: '' };
    } catch {
      return { records: [], error: '기록을 불러오지 못했습니다.' };
    }
  });

  // 높은 레벨 우선, 같은 레벨이면 빠른 기록 우선
  const sortedRecords = [...records].sort((a, b) => (
    b.level - a.level || a.playTime - b.playTime
  ));

  function handleReset() {
    try {
      clearGameRecords();
      setRanking({ records: [], error: '' });
    } catch {
      setRanking((previous) => ({
        ...previous,
        error: '기록을 초기화하지 못했습니다.',
      }));
    }
  }

  return (
    <Section aria-labelledby="ranking-title">
      <Heading>
        <h1 id="ranking-title">랭킹</h1>
        <ResetButton type="button" onClick={handleReset}>초기화</ResetButton>
      </Heading>
      <p>높은 레벨부터, 같은 레벨에서는 빠른 기록부터 표시됩니다.</p>
      {error ? (
        <p role="alert">{error}</p>
      ) : sortedRecords.length === 0 ? (
        <p>아직 기록이 없어요.</p>
      ) : (
        <TableContainer tabIndex={0} role="region" aria-label="랭킹 기록, 작은 화면에서는 가로 스크롤">
          <Table aria-labelledby="ranking-title">
            <thead>
              <tr>
                <th scope="col">순위</th>
                <th scope="col">플레이 시각</th>
                <th scope="col">레벨</th>
                <th scope="col">플레이 시간</th>
              </tr>
            </thead>
            <tbody>
              {sortedRecords.map((record, index) => (
                <tr key={record.id}>
                  <td>{index + 1}</td>
                  <td>
                    <time dateTime={record.playedAt}>
                      {new Date(record.playedAt).toLocaleString('ko-KR')}
                    </time>
                  </td>
                  <td>Level {record.level}</td>
                  <td>{record.playTime.toFixed(2)}초</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </Section>
  );
}
