import { useContext } from 'react';
import { DataContext } from '../../reducer/context';
import LineChart from '../LineChart/LineChart';
import styled from 'styled-components';
import { Text } from '../shared/Text';
import { TODAY_MIDNIGHT, DAY } from '../../constants';

export default function TodayUsersLineChart() {
  const { yesterdayUsers, todayUsers } = useContext(DataContext);
  const data = todayUsers.data.map((element: number[], index: number) => [
    yesterdayUsers.data[index][0],
    element[1],
  ]);

  const xDomain = [TODAY_MIDNIGHT - DAY, TODAY_MIDNIGHT];
  const yDomain = [0, 1200];
  const tickValue = [0, 300, 600, 900, 1200];
  const isSeries = true;

  return (
    <LineChartContainer>
      <LineChartWrapper>
        <Text>금일 사용자</Text>
        <LineChart
          axisData={yesterdayUsers.data}
          data={data}
          xDomain={xDomain}
          yDomain={yDomain}
          tickValue={tickValue}
          isSeries={isSeries}
        />
      </LineChartWrapper>
    </LineChartContainer>
  );
}

const LineChartContainer = styled.div`
  display: inline-flex;
  flex: 1 1 auto;
  width: 100%;
  min-width: 180px;
  min-height: 0px;
  padding: 0.4rem;
`;

const LineChartWrapper = styled.div`
  width: 100%;
  padding: 0.8rem;
  padding-bottom: 2.4rem;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 3px 0px, rgb(0 0 0 / 12%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px;
  color: rgb(34, 34, 34);
`;
