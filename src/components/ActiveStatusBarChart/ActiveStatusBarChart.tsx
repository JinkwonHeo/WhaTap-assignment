import { useContext, useEffect } from 'react';
import { DataContext, DispatchContext } from '../../reducer/context';
import { max } from 'd3';
import BarChart from '../BarChart/BarChart';
import { IBarChartData } from '../BarChart/type';
import styled from 'styled-components';
import { updateFetchedStatus, updateQueue } from '../../reducer/action';

export default function ActiveStatusBarChart() {
  const dispatch = useContext(DispatchContext);
  const { activeStatus } = useContext(DataContext);

  const data: IBarChartData[] = [
    {
      name: 'METHOD',
      value: activeStatus.data[0],
      color: '#b7e2fb',
    },
    {
      name: 'SQL',
      value: activeStatus.data[1],
      color: '#b0eae9',
    },
    {
      name: 'HTTPC',
      value: activeStatus.data[2],
      color: '#ebbdf5',
    },
    {
      name: 'DBC',
      value: activeStatus.data[3],
      color: '#f2ccbb',
    },
    {
      name: 'SOCKET',
      value: activeStatus.data[4],
      color: '#fa697c',
    },
  ];

  const maxValue: number | undefined = max(data, (entry) => entry.value);

  useEffect(() => {
    if (activeStatus.isFetched) {
      dispatch(
        updateQueue({
          fetchType: 'spot',
          fetchName: 'activeStatus',
          promiseAllKey: ['act_method', 'act_sql', 'act_httpc', 'act_dbc', 'act_socket'],
        })
      );
      dispatch(updateFetchedStatus(false, 'activeStatus'));
    }
  }, [activeStatus.isFetched]);

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
