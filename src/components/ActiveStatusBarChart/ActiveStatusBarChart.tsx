import { useContext } from 'react';
import { DataContext } from '../../reducer/context';
import { max } from 'd3';
import BarChart from '../BarChart/BarChart';
import { IBarChartData } from '../BarChart/type';
import styled from 'styled-components';

export default function ActiveStatusBarChart() {
  const { activeStatus } = useContext(DataContext);
  const { activeMethod, activeSql, activeHttpc, activeDbc, activeSocket } = activeStatus;

  const data: IBarChartData[] = [
    {
      name: 'METHOD',
      value: activeMethod.data,
      color: '#b7e2fb',
    },
    {
      name: 'SQL',
      value: activeSql.data,
      color: '#b0eae9',
    },
    {
      name: 'HTTPC',
      value: activeHttpc.data,
      color: '#ebbdf5',
    },
    {
      name: 'DBC',
      value: activeDbc.data,
      color: '#f2ccbb',
    },
    {
      name: 'SOCKET',
      value: activeSocket.data,
      color: '#fa697c',
    },
  ];

  const maxValue: number | undefined = max(data, (entry) => entry.value);

  return (
    <BarChartContainer>
      <BarChartWrapper>
        <BarChart data={data} maxValue={maxValue} />
      </BarChartWrapper>
    </BarChartContainer>
  );
}

const BarChartContainer = styled.div`
  display: inline-flex;
  flex: 1 1 auto;
  width: 100%;
  min-width: 180px;
  min-height: 0px;
  padding: 0.4rem;
`;

const BarChartWrapper = styled.div`
  width: 100%;
  padding: 0.8rem;
  padding-bottom: 2.4rem;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 3px 0px, rgb(0 0 0 / 12%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px;
  color: rgb(34, 34, 34);
`;
