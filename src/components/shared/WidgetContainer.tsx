import styled from 'styled-components';

export const WidgetContainer = styled.div`
  display: inline-flex;
  width: 25%;
  height: 30%;
  min-width: 300px;
  min-height: 148px;

  @media screen and (max-width: 500px) {
    width: 100%;
    min-width: 300px;
  }
`;
