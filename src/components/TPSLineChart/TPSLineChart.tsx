import { useContext } from 'react';
import { DataContext } from '../../reducer/context';
import { max } from 'd3';
import LineChart from '../LineChart/LineChart';

export default function TPSLineChart() {
  const { tps } = useContext(DataContext);
  const data = tps.data.map((element) => element.data);
  const maxDomainValue: number | undefined = max(data, function (d) {
    return d;
  });

  const xDomain = [Date.now() - 1000 * 60 * 10, Date.now()];
  const yDomain = [0, maxDomainValue ? (maxDomainValue * 4) / 3 : 100];

  const format = '%H:%M';
  const xTick = 2;

  return (
    <LineChart
      tps={tps}
      data={data}
      xDomain={xDomain}
      yDomain={yDomain}
      format={format}
      xTick={xTick}
    />
  );
}
