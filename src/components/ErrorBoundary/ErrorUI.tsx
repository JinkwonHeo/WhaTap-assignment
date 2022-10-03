import styled from 'styled-components';

export default function ErrorUI({ error }: any) {
  return (
    <ErrorUIContainer>
      <h2>에러가 발생했습니다. 다시 시도해주세요.</h2>
      <details style={{ whiteSpace: 'pre-wrap' }}>{error && error.toString()}</details>
    </ErrorUIContainer>
  );
}

const ErrorUIContainer = styled.div`
  padding: 20px;
`;

const PrevButton = styled.button`
  width: 200px;
  height: 40px;
  margin-top: 20px;
`;
