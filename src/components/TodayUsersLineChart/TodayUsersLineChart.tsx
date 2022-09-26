import { useContext } from 'react';
import { DataContext } from '../../reducer/context';
import LineChart from '../LineChart/LineChart';
import styled from 'styled-components';
import { Text } from '../shared/Text';

export default function TodayUsersLineChart() {
  const { yesterdayUsers } = useContext(DataContext);
  const data = yesterdayUsers.data.map((element: number[]) => element[1]);
  const TODAY_MIDNIGHT = new Date().setHours(0, 0, 0);
  const DAY = 1000 * 60 * 60 * 24;
  const isSeries = true;

  const xDomain = [TODAY_MIDNIGHT - DAY * 2, TODAY_MIDNIGHT - DAY];
  const yDomain = [0, 1200];
  const tickValue = [0, 300, 600, 900, 1200];

  const format = '%H:%M';

  return (
    <LineChartContainer>
      <LineChartWrapper>
        <Text>금일 사용자</Text>
        <LineChart
          axisData={yesterdayUsers.data}
          data={data}
          xDomain={xDomain}
          yDomain={yDomain}
          format={format}
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
