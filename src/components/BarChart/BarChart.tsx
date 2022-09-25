import { useRef, useEffect, useContext } from 'react';
import { select, scaleBand, scaleLinear, max, axisLeft } from 'd3';
import useResizeObserver from '../../hooks/useResizeOBserver';
import { DataContext } from '../../reducer/context';
import { IBarChartData, INode } from './type';
import styled from 'styled-components';

export default function RacingBarChart() {
  const svgRef = useRef(null);
  const wrappedRef = useRef(null);
  const dimensions = useResizeObserver(wrappedRef);
  const { activeMethod, activeSql, activeHttpc, activeDbc, activeSocket } = useContext(DataContext);
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

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const maxValue: number | undefined = max(data, (entry) => entry.value);

    const xScale = scaleLinear()
      .domain([0, maxValue ? maxValue : 100])
      .range([0, dimensions.width]);
    const yScale: any = scaleBand<number>()
      .paddingInner(0.2)
      .domain(data.map((value: IBarChartData, index: number) => index))
      .range([0, dimensions.height]);

    const valueAxisScale = scaleBand()
      .domain(data.map((value: any) => value.value))
      .range([0, dimensions.height]);
    const valueAxis: any = axisLeft(valueAxisScale).tickSize(0).tickPadding(12);

    svg.select('.value-axis').call(valueAxis);

    svg
      .selectAll<SVGSVGElement, INode>('.bar')
      .data(data, (entry, index) => entry.name)
      .join((enter) => enter.append('rect').attr('y', (entry, index) => yScale(index)))
      .attr('fill', (entry) => entry.color)
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('height', yScale.bandwidth())
      .transition()
      .attr('width', (entry) => xScale(entry.value))
      .attr('y', (entry, index) => yScale(index));

    svg
      .selectAll<SVGSVGElement, INode>('.label')
      .data(data, (entry, index) => entry.name)
      .join((enter) =>
        enter.append('text').attr('y', (entry, index) => yScale(index) + yScale.bandwidth() / +6)
      )
      .text((entry) => `${entry.name} (${entry.value})`)
      .attr('class', 'label')
      .attr('x', 10)
      .transition()
      .attr('y', (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 6);
  }, [data, dimensions]);

  return (
    <SvgWrapper ref={wrappedRef}>
      <BarChartSvg ref={svgRef}>
        <g className="value-axis" />
      </BarChartSvg>
    </SvgWrapper>
  );
}

const SvgWrapper = styled.div`
  max-width: 500px;
  height: 300px;
  margin: 0 auto;
  margin-bottom: 10px;
`;

const BarChartSvg = styled.svg`
  display: block;
  width: 100%;
  height: 300px;
  overflow: visible;
`;
