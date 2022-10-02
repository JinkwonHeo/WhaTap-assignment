import { Oval } from 'react-loader-spinner';
import styled from 'styled-components';

export default function LoadingCircle() {
  return (
    <LoadingCircleWrapper>
      <Oval
        height={70}
        width={70}
        color="#81b8fc"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#B4EBFD"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    </LoadingCircleWrapper>
  );
}

const LoadingCircleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
