import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../reducer/context';
import { max } from 'd3';
import LineChart from '../LineChart/LineChart';
import styled from 'styled-components';
import { Text } from '../shared/Text';
import getMaxDomainValue from '../../utils/getMaxDomainValue';

export default function TPSLineChart() {
  const [maxDomainValue, setMaxDomainValue] = useState(0);
  const { simultaneousUser } = useContext(DataContext);
  const data = simultaneousUser.data.map((element) => element.data);
  const maxDataValue: number | undefined = max(data, function (d) {
    return d;
  });

  const xDomain = [Date.now() - 1000 * 60 * 10, Date.now()];
  const yDomain = [0, maxDataValue ? maxDomainValue : 1200];

  useEffect(() => {
    if (maxDataValue) {
      const value = getMaxDomainValue(maxDataValue);

      if (value) {
        setMaxDomainValue(value);
      }
    }
  }, [data]);

  return (
    <LineChartContainer>
      <LineChartWrapper>
        <Text>동시접속 사용자</Text>
        <LineChart
          axisData={simultaneousUser.data}
          data={data}
          xDomain={xDomain}
          yDomain={yDomain}
          maxDomainValue={maxDomainValue}
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
