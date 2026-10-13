import styled from '@emotion/styled';

const Section = styled.section`
  padding: 40px 0;
  text-align: center;
`;

export default function Ranking() {
  return (
    <Section aria-labelledby="ranking-title">
      <h1 id="ranking-title">랭킹</h1>
      <p>아직 기록이 없어요.</p>
    </Section>
  );
}
