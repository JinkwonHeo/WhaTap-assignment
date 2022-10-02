import { max } from 'd3';
import { useContext, useEffect, memo, useState } from 'react';
import styled from 'styled-components';
import { DAY, MINUTE, QUEUE_FORMAT, TODAY_MIDNIGHT } from '../../constants';
import { updateFetchedStatus, updateQueue } from '../../reducer/action';
import { DataContext, DispatchContext } from '../../reducer/context';
import getMaxDomainValue from '../../utils/getMaxDomainValue';
import BarChart from '../BarChart/BarChart';
import LineChart from '../LineChart/LineChart';
import { Text } from '../shared/Text';
import { ObjType } from './types';

export function Widget(props: ObjType) {
  const [maxDomainValue, setMaxDomainValue] = useState(0);
  const dispatch = useContext(DispatchContext);
  const state = useContext(DataContext);
  const widgetData = state[props.widgetType];
  const stateArray = widgetData.data.map(
    (element: { timeStamp: number; data: number }) => element.data
  );
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

  useEffect(() => {
    if (widgetData.isFetched) {
      if (props.widgetType === 'todayUsers') {
        setTimeout(() => {
          dispatch(updateQueue(QUEUE_FORMAT.todayUsers));
          dispatch(updateFetchedStatus(false, 'todayUsers'));
        }, MINUTE * 5);
      } else {
        dispatch(updateQueue(QUEUE_FORMAT[props.widgetType]));
        dispatch(updateFetchedStatus(false, widgetData.key));
      }
    }
  }, [widgetData.isFetched]);

  if (props.chartType === 'bar') {
    const data = [
      {
        name: 'METHOD',
        value: widgetData.data[0],
        color: '#b7e2fb',
      },
      {
        name: 'SQL',
        value: widgetData.data[1],
        color: '#b0eae9',
      },
      {
        name: 'HTTPC',
        value: widgetData.data[2],
        color: '#ebbdf5',
      },
      {
        name: 'DBC',
        value: widgetData.data[3],
        color: '#f2ccbb',
      },
      {
        name: 'SOCKET',
        value: widgetData.data[4],
        color: '#fa697c',
      },
    ];

    const maxValue: number | undefined = max(data, (entry) => entry.value);

    return (
      <WidgetContainer>
        <WidgetWrapper>
          <Text>{props.title}</Text>
          <BarChart data={data} maxValue={maxValue} />
        </WidgetWrapper>
      </WidgetContainer>
    );
  }

  if (props.chartType === 'line') {
    const stateArray =
      props.widgetType === 'todayUsers'
        ? state.todayUsers.data.map((element: number[], index: number) => [
            state.yesterdayUsers.data[index][0],
            element[1],
          ])
        : widgetData.data.map((element: { timeStamp: number; data: number }) => element.data);
    const xDomain =
      props.widgetType === 'todayUsers'
        ? [TODAY_MIDNIGHT - DAY, TODAY_MIDNIGHT]
        : [Date.now() - 1000 * 60 * 10, Date.now()];
    const yDomain =
      props.widgetType === 'todayUsers' ? [0, 1200] : [0, maxDomainValue ? maxDomainValue : 1200];
    const tickValue = props.widgetType === 'todayUsers' ? [0, 300, 600, 900, 1200] : undefined;
    const isSeries = props.widgetType === 'todayUsers' ? true : undefined;

    return (
      <WidgetContainer>
        <WidgetWrapper>
          <Text>{props.title}</Text>
          <LineChart
            axisData={
              props.widgetType === 'todayUsers' ? state.yesterdayUsers.data : widgetData.data
            }
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
  width: 100%;
  padding: 0.8rem;
  padding-bottom: 2.4rem;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 3px 0px, rgb(0 0 0 / 12%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px;
  color: rgb(34, 34, 34);
`;

export const MemoizedWidget = memo(Widget);
