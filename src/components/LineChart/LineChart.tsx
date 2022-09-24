import { useRef, useEffect } from 'react';
import {
  axisBottom,
  axisLeft,
  line,
  scaleLinear,
  select,
  scaleTime,
  timeMinute,
  timeFormat,
} from 'd3';
import useResizeObserver from '../../hooks/useResizeOBserver';
import styled from 'styled-components';
import { ITps } from '../../reducer/types';

export default function LineChart({
  tps,
  data,
  xDomain,
  yDomain,
  format,
  xTick,
}: {
  tps: ITps;
  data: number[];
  xDomain: number[];
  yDomain: number[];
  format: string;
  xTick: number;
}) {
  const svgRef = useRef(null);
  const wrappedRef = useRef(null);
  const dimensions = useResizeObserver(wrappedRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const lineGenerator = line<any>()
      .x((value) => xScale(value.timeStamp))
      .y((value) => yScale(value.data));

    const xScale = scaleTime().domain(xDomain).range([0, dimensions.width]);
    const yScale = scaleLinear().domain(yDomain).range([dimensions.height, 0]);

    const xAxis: any = axisBottom<Date>(xScale)
      .tickFormat(timeFormat(format))
      .ticks(timeMinute.every(xTick));
    const yAxis: any = axisLeft(yScale).ticks(4);

    svg.select('.x-axis').style('transform', `translateY(${dimensions.height}px)`).call(xAxis);
    svg.select('.y-axis').call(yAxis);

    svg
      .selectAll('.line')
      .data([tps.data])
      .join('path')
      .attr('class', 'line')
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#4897F8')
      .attr('stroke-width', 1.5);
  }, [data, dimensions]);

  return (
    <SvgWrapper ref={wrappedRef}>
      <LineChartSvg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </LineChartSvg>
    </SvgWrapper>
  );
}

const SvgWrapper = styled.div`
  max-width: 500px;
  height: 300px;
  margin: 0 auto;
`;

const LineChartSvg = styled.svg`
  display: block;
  width: 100%;
  height: 300px;
  background: #f7f7f7;
  overflow: visible;
`;
