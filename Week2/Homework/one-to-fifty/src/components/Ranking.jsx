import styled from '@emotion/styled';
import { useState } from 'react';
import { loadGameRecords } from '../utils/gameRecords';

const Section = styled.section`
  padding: 40px 0;
  text-align: center;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;

  th, td {
    padding: 16px;
    border-bottom: 1px solid #ded9e6;
    white-space: nowrap;
  }

  th {
    background: #e9e4ef;
  }

  td:last-child {
    font-variant-numeric: tabular-nums;
  }
`;

export default function Ranking() {
  const [{ records, error }] = useState(() => {
    try {
      return { records: loadGameRecords(), error: '' };
    } catch {
      return { records: [], error: '기록을 불러오지 못했습니다.' };
    }
  });

  // 원본 배열은 유지하고 복사본만 시간순 정렬
  const sortedRecords = [...records].sort((a, b) => a.playTime - b.playTime);

  return (
    <Section aria-labelledby="ranking-title">
      <h1 id="ranking-title">랭킹</h1>
      {error ? (
        <p role="alert">{error}</p>
      ) : sortedRecords.length === 0 ? (
        <p>아직 기록이 없어요.</p>
      ) : (
        <TableContainer>
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
