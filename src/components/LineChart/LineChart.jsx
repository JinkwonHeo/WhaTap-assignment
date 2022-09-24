import { useContext, useRef, useEffect, useState } from 'react';
import {
  axisBottom,
  axisLeft,
  line,
  max,
  scaleLinear,
  select,
  scaleTime,
  timeMinute,
  timeFormat,
} from 'd3';
import { DataContext } from '../../reducer/context';
import useResizeObserver from '../../hooks/useResizeOBserver';
import styled from 'styled-components';

export default function LineChart() {
  const { tps } = useContext(DataContext);
  const svgRef = useRef(null);
  const wrappedRef = useRef(null);
  const dimensions = useResizeObserver(wrappedRef);
  const data = tps.data.map((element) => element.data);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const maxDomainValue = max(data, function (d) {
      return d;
    });

    console.log(tps.data);

    const myLine = line()
      .x((value) => xScale(value.timeStamp))
      .y((value) => yScale(value.data));

    const xScale = scaleTime()
      .domain([Date.now() - 1000 * 60 * 10, Date.now()])
      .range([0, dimensions.width]);
    const yScale = scaleLinear()
      .domain([0, (maxDomainValue * 4) / 3])
      .range([dimensions.height, 0]);

    const xAxis = axisBottom(xScale).tickFormat(timeFormat('%H:%M')).ticks(timeMinute.every(2));
    const yAxis = axisLeft(yScale).ticks(4);
    svg.select('.x-axis').style('transform', `translateY(${dimensions.height}px)`).call(xAxis);
    svg.select('.y-axis').call(yAxis);

    svg
      .selectAll('.line')
      .data([tps.data])
      .join('path')
      .attr('class', 'line')
      .attr('d', myLine)
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
