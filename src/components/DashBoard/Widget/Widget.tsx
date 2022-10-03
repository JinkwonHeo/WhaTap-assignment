import { max } from 'd3';
import React, { useContext, useEffect, useState, Fragment } from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import styled from 'styled-components';
import { DAY, MINUTE, QUEUE_FORMAT, TODAY_MIDNIGHT } from '../../../constants';
import { updateFetchedStatus, updateQueue } from '../../../reducer/action';
import { DataContext, DispatchContext } from '../../../reducer/context';
import getMaxDomainValue from '../../../utils/getMaxDomainValue';
import BarChart from './Chart/BarChart/BarChart';
import LineChart from './Chart/LineChart/LineChart';
import Modal from '../../Modal/Modal';
import ModalPortal from '../../Portal/Portal';
import { Text } from '../../shared/Text';
import { IInformation, IInformButtonPosition } from './types';

export default function Widget({
  widgetType,
  information,
  chartType,
  title,
}: {
  widgetType: 'activeStatus' | 'tps' | 'informatics' | 'todayUsers' | 'simultaneousUser';
  information?: IInformation;
  chartType: string;
  title: string;
}) {
  const [maxDomainValue, setMaxDomainValue] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [informButtonPosition, setInformButtonPosition] = useState<IInformButtonPosition>({
    x: 0,
    y: 0,
  });
  const dispatch = useContext(DispatchContext);
  const state = useContext(DataContext);
  const widgetData = state[widgetType];

  const handleModalToggle = (e: React.MouseEvent<HTMLOrSVGElement>): void => {
    setInformButtonPosition({ x: e.pageX, y: e.pageY });
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (widgetData.isFetched) {
      if (widgetType === 'todayUsers') {
        setTimeout(() => {
          dispatch(updateQueue(QUEUE_FORMAT.todayUsers));
          dispatch(updateFetchedStatus(false, 'todayUsers'));
        }, MINUTE * 5);
      } else {
        dispatch(updateQueue(QUEUE_FORMAT[widgetType]));
        dispatch(updateFetchedStatus(false, widgetData.key));
      }
    }
  }, [widgetData.isFetched]);

  if (chartType === 'bar') {
    const data = [
      {
        name: 'METHOD',
        value: widgetData?.data[0],
        color: '#b7e2fb',
      },
      {
        name: 'SQL',
        value: widgetData?.data[1],
        color: '#b0eae9',
      },
      {
        name: 'HTTPC',
        value: widgetData?.data[2],
        color: '#ebbdf5',
      },
      {
        name: 'DBC',
        value: widgetData?.data[3],
        color: '#f2ccbb',
      },
      {
        name: 'SOCKET',
        value: widgetData?.data[4],
        color: '#fa697c',
      },
    ];

    const maxValue: number | undefined = max(data, (entry) => entry.value);

    return (
      <WidgetContainer>
        <WidgetWrapper>
          <Text>{title}</Text>
          <BarChart data={data} maxValue={maxValue} />
        </WidgetWrapper>
      </WidgetContainer>
    );
  }

  if (chartType === 'line') {
    const stateArray =
      widgetType === 'todayUsers'
        ? state.todayUsers.data.map((element: number[], index: number) => [
            state.yesterdayUsers.data[index][0],
            element[1],
          ])
        : widgetData.data.map((element: { timeStamp: number; data: number }) => element.data);
    const maxDataValue: number | undefined = max(stateArray, function (d: number) {
      return d;
    });

    useEffect(() => {
      if (maxDataValue) {
        const value = getMaxDomainValue(maxDataValue);

        if (value) {
          setMaxDomainValue(value);
        }
      }
    }, [maxDataValue, maxDomainValue]);

    const xDomain =
      widgetType === 'todayUsers'
        ? [TODAY_MIDNIGHT - DAY, TODAY_MIDNIGHT]
        : [Date.now() - 1000 * 60 * 10, Date.now()];
    const yDomain =
      widgetType === 'todayUsers' ? [0, 1200] : [0, maxDomainValue ? maxDomainValue : 1200];
    const tickValue = widgetType === 'todayUsers' ? [0, 300, 600, 900, 1200] : undefined;
    const isSeries = widgetType === 'todayUsers' ? true : undefined;

    return (
      <WidgetContainer>
        <WidgetWrapper>
          <WidgetTitleInformationWrapper>
            <Text>{title}</Text>
            {isModalOpen && (
              <ModalPortal>
                <Modal handleModalToggle={handleModalToggle} buttonPosition={informButtonPosition}>
                  <ModalContentContainer>
                    <ModalContentHeader>{information?.title}</ModalContentHeader>
                    <ModalContent>
                      {information?.description.map((paragraph, index) => (
                        <Fragment key={index}>
                          <ModalContentParagraph>{paragraph}</ModalContentParagraph>
                        </Fragment>
                      ))}
                    </ModalContent>
                  </ModalContentContainer>
                </Modal>
              </ModalPortal>
            )}
            <IoMdInformationCircleOutline
              style={{ marginLeft: '5px', color: 'gray', cursor: 'pointer' }}
              size={'1.2rem'}
              onClick={(e) => handleModalToggle(e)}
            />
          </WidgetTitleInformationWrapper>
          <LineChart
            axisData={widgetType === 'todayUsers' ? state.yesterdayUsers.data : widgetData.data}
            data={stateArray}
            xDomain={xDomain}
            yDomain={yDomain}
            maxDomainValue={maxDomainValue}
            tickValue={tickValue}
            isSeries={isSeries}
          />
        </WidgetWrapper>
      </WidgetContainer>
    );
  }

  return <div>widget</div>;
}

const WidgetContainer = styled.div`
  display: inline-flex;
  flex: 1 1 auto;
  width: 100%;
  min-width: 180px;
  min-height: 0px;
  padding: 0.4rem;
`;

const WidgetWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0.8rem;
  padding-bottom: 2.4rem;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 3px 0px, rgb(0 0 0 / 12%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px;
  color: rgb(34, 34, 34);
`;

const WidgetTitleInformationWrapper = styled.div`
  display: flex;
`;

const ModalContentContainer = styled.div``;

const ModalContentHeader = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  padding: 0.7rem;
  border-bottom: solid #b3b3b394 1px;
  font-family: Pretendard-medium;
  font-size: 1.5rem;
  color: #3e3e3ec3;
`;

const ModalContent = styled.div`
  padding: 0.8rem;
  font-family: Pretendard-light;
  font-size: 1rem;
  color: #000000c3;
`;

const ModalContentParagraph = styled.div`
  margin-bottom: 1.5rem;
  word-break: keep-all;
`;
