import { useContext } from 'react';
import { DataContext } from '../../reducer/context';
import { max } from 'd3';
import LineChart from '../LineChart/LineChart';
import styled from 'styled-components';

export default function TPSLineChart() {
  const { simultaneousUser } = useContext(DataContext);
  const data = simultaneousUser.data.map((element) => element.data);
  const maxDomainValue: number | undefined = max(data, function (d) {
    return d;
  });
  console.log(simultaneousUser);
  const xDomain = [Date.now() - 1000 * 60 * 10, Date.now()];
  const yDomain = [0, maxDomainValue ? (maxDomainValue * 4) / 3 : 100];

  const format = '%H:%M';
  const xTick = 2;
  const chartName = '동시접속 사용자';

  return (
    <LineChartContainer>
      <LineChartWrapper>
        <LineChart
          axisData={simultaneousUser.data}
          data={data}
          xDomain={xDomain}
          yDomain={yDomain}
          format={format}
          xTick={xTick}
          chartName={chartName}
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
