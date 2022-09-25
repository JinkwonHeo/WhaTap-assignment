import { useRef, useEffect } from 'react';
import {
  axisBottom,
  axisLeft,
  line,
  area,
  scaleLinear,
  select,
  scaleTime,
  timeMinute,
  timeFormat,
  max,
} from 'd3';
import useResizeObserver from '../../hooks/useResizeOBserver';
import styled from 'styled-components';
import { ITps } from '../../reducer/types';
import { Text } from '../shared/Text';

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
  const maxDomainValue: any = max(data, function (d) {
    return d;
  });

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const lineGenerator = line<any>()
      .x((value) => xScale(value.timeStamp))
      .y((value) => yScale(value.data));

    const xScale = scaleTime().domain(xDomain).range([0, dimensions.width]);
    const yScale = scaleLinear().domain(yDomain).range([dimensions.height, 0]);

    const areaGenerator = area<any>()
      .x((value) => xScale(value.timeStamp))
      .y0(yScale(0))
      .y1((value) => yScale(value.data));

    const xAxis: any = axisBottom<Date>(xScale)
      .tickFormat(timeFormat(format))
      .ticks(timeMinute.every(xTick))
      .tickSizeOuter(0);
    const yAxis: any = axisLeft(yScale).ticks(5).tickSize(0).tickPadding(6).tickSizeOuter(0);

    svg.select('.x-axis').style('transform', `translateY(${dimensions.height}px)`).call(xAxis);
    svg.select('.y-axis').style('transform', 'translateX(1px)').call(yAxis);

    svg
      .append('linearGradient')
      .attr('id', 'line-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', yScale(0))
      .attr('x2', 0)
      .attr('y2', yScale(maxDomainValue))
      .selectAll('stop')
      .data([
        { offset: '0%', color: '#81b8fc' },
        { offset: '100%', color: '#B4EBFD' },
      ])
      .enter()
      .append('stop')
      .attr('offset', function (d) {
        return d.offset;
      })
      .attr('stop-color', function (d) {
        return d.color;
      });

    svg
      .selectAll('.line')
      .data([tps.data])
      .join('path')
      .attr('class', 'line')
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#4897F8')
      .attr('stroke-width', 3);

    svg
      .selectAll('.area')
      .data([tps.data])
      .join('path')
      .attr('class', 'area')
      .attr('d', areaGenerator)
      .attr('fill', 'url(#line-gradient)');
  }, [data, dimensions]);

  return (
    <>
      <Text>TPS</Text>
      <SvgWrapper ref={wrappedRef}>
        <LineChartSvg ref={svgRef}>
          <LineChartGroup className="x-axis" />
          <LineChartGroup className="y-axis" />
        </LineChartSvg>
      </SvgWrapper>
    </>
  );
}

const SvgWrapper = styled.div`
  padding-top: 1.5rem;
  padding-left: 20px;
`;

const LineChartSvg = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
`;

const LineChartGroup = styled.g`
  font-family: Pretendard-light;
  font-size: 0.8rem;
`;
