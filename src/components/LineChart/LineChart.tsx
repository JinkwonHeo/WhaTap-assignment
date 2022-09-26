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
  range,
} from 'd3';
import useResizeObserver from '../../hooks/useResizeOBserver';
import styled from 'styled-components';
import { IAxisData } from './type';

export default function LineChart({
  axisData,
  data,
  xDomain,
  yDomain,
  format,
  xTick,
  maxDomainValue,
  tickValue,
}: {
  axisData: IAxisData[];
  data: number[];
  xDomain: number[];
  yDomain: number[];
  format: string;
  xTick: number;
  maxDomainValue: number;
  tickValue?: number[];
}) {
  const svgRef = useRef<SVGSVGElement>(null);
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

    const areaGenerator = area<any>()
      .x((value) => xScale(value.timeStamp))
      .y0(yScale(0))
      .y1((value) => yScale(value.data));

    const xAxis: any = axisBottom<Date>(xScale)
      .tickFormat(timeFormat(format))
      .ticks(timeMinute.every(xTick))
      .tickSizeOuter(0);
    const yAxis: any = axisLeft(yScale)
      .ticks(5)
      .tickValues(
        tickValue
          ? tickValue
          : range(
              0,
              Number(maxDomainValue) + Number(maxDomainValue) / 4,
              Number(maxDomainValue) / 4
            )
      )
      .tickSize(0)
      .tickPadding(6)
      .tickSizeOuter(0);

    svg
      .select('.x-axis')
      .style('transform', `translateX(3px) translateY(${dimensions.height}px)`)
      .call(xAxis);
    svg.select('.y-axis').style('transform', 'translateX(3px)').call(yAxis);

    svg
      .append('linearGradient')
      .attr('id', 'line-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', yScale(0))
      .attr('x2', 0)
      .attr('y2', yScale(Number(maxDomainValue)))
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
      .data([axisData])
      .join('path')
      .attr('class', 'line')
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#4897F8')
      .attr('stroke-width', 3);

    svg
      .selectAll('.area')
      .data([axisData])
      .join('path')
      .attr('class', 'area')
      .attr('d', areaGenerator)
      .attr('fill', 'url(#line-gradient)');
  }, [data, dimensions]);

  return (
    <>
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
  padding: 1.5rem 0.5rem 0 1.8rem;
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
