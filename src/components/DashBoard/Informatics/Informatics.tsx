import { Fragment, useContext, useEffect } from 'react';
import { DataContext, DispatchContext } from '../../../reducer/context';
import styled from 'styled-components';
import { updateFetchedStatus, updateQueue } from '../../../reducer/action';
import { QUEUE_FORMAT } from '../../../constants';

export default function Informatics() {
  const dispatch = useContext(DispatchContext);
  const { informatics } = useContext(DataContext);

  const informaticsData: { name: string; value: number }[] = [
    { name: '애플리케이션 서버', value: informatics.data[0] },
    { name: '비활성 애플리케이션', value: informatics.data[1] },
    { name: 'CPU 코어', value: informatics.data[2] },
    { name: 'Hosts', value: informatics.data[3] },
  ];

  useEffect(() => {
    if (informatics.isFetched) {
      dispatch(updateQueue(QUEUE_FORMAT.informatics));
      dispatch(updateFetchedStatus(false, 'informatics'));
    }
  }, [informatics.isFetched]);

  return (
    <InformaticsFlexContainer>
      <InformaticsGridContainer>
        {informaticsData.map((data, index) => (
          <Fragment key={index}>
            <InformaticsItemFlexContainer>
              <InformaticsName>{data.name}</InformaticsName>
              <InformaticsValue>{data.value}</InformaticsValue>
            </InformaticsItemFlexContainer>
          </Fragment>
        ))}
      </InformaticsGridContainer>
    </InformaticsFlexContainer>
  );
}

const InformaticsFlexContainer = styled.div`
  display: inline-flex;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  min-height: 0px;
  max-width: 100px;
  margin: 0.4rem;
`;

const InformaticsGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  font-family: Pretendard-medium;
  font-size: 0.9rem;
  word-break: keep-all;
  line-height: 1;
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 3px 0px, rgb(0 0 0 / 12%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px;
  color: rgb(34, 34, 34);
`;

const InformaticsItemFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem;

  &:not(:last-child) {
    border-bottom: 1px solid rgb(211, 211, 211);
  }
`;

const InformaticsName = styled.div`
  flex: 1 1 0%;
  padding-bottom: 4px;
`;

const InformaticsValue = styled.div`
  font-size: 1.2rem;
  text-align: right;
`;
