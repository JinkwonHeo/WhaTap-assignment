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
  max,
  timeHour,
} from 'd3';
import useResizeObserver from '../../hooks/useResizeOBserver';
import styled from 'styled-components';
import { IAxisData } from './type';

export default function LineChart({
  axisData,
  data,
  xDomain,
  yDomain,
  maxDomainValue,
  tickValue,
  isSeries,
}: {
  axisData: IAxisData[];
  data: number[];
  xDomain: number[];
  yDomain: number[];
  maxDomainValue?: number;
  tickValue?: number[];
  isSeries?: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrappedRef = useRef(null);
  const dimensions = useResizeObserver(wrappedRef);

  const gradientScaleValue: any = max(data, function (d) {
    return d;
  });

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const lineGenerator = line<any>()
      .x((value) => xScale(isSeries ? value[0] : value.timeStamp))
      .y((value) => yScale(isSeries ? value[1] : value.data));

    const xScale = scaleTime().domain(xDomain).range([0, dimensions.width]);
    const yScale = scaleLinear().domain(yDomain).range([dimensions.height, 0]);

    const areaGenerator = area<any>()
      .x((value) => xScale(isSeries ? value[0] : value.timeStamp))
      .y0(yScale(0))
      .y1((value) => yScale(isSeries ? value[1] : value.data));

    const xAxis: any = axisBottom<Date>(xScale)
      .tickFormat(timeFormat('%H:%M'))
      .ticks(isSeries ? timeHour.every(4) : timeMinute.every(2))
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
      .tickSize(-dimensions.width)
      .tickPadding(6)
      .tickSizeOuter(0);

    svg.select('.x-axis').style('transform', `translateY(${dimensions.height}px)`).call(xAxis);
    svg.select('.y-axis').call(yAxis);

    if (!document.getElementById('line-gradient')) {
      svg
        .append('linearGradient')
        .attr('id', 'line-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0)
        .attr('y1', yScale(0))
        .attr('x2', 0)
        .attr('y2', yScale(gradientScaleValue))
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
    }

    svg
      .selectAll('.line')
      .data([axisData])
      .join('path')
      .attr('class', 'line')
      .attr('d', lineGenerator)
      .attr('fill', 'none')
      .attr('stroke', isSeries ? '#999999' : '#4897F8')
      .attr('stroke-width', 3);

    svg
      .selectAll('.area')
      .data([axisData])
      .join('path')
      .attr('class', 'area')
      .attr('d', areaGenerator)
      .attr('fill', isSeries ? '#e5e5e5' : 'url(#line-gradient)');

    svg.selectAll('line').style('stroke', '#99999950').style('stroke-dasharray', '3, 0.5');
    svg.select('.domain').style('stroke', 'black');

    if (isSeries) {
      svg
        .selectAll('.sub-line')
        .data([data])
        .join('path')
        .attr('class', 'sub-line')
        .attr('d', lineGenerator)
        .attr('fill', 'none')
        .attr('stroke', '#4897F8')
        .attr('stroke-width', 3);

      svg
        .selectAll('.sub-area')
        .data([data])
        .join('path')
        .attr('class', 'sub-area')
        .attr('d', areaGenerator)
        .attr('fill', 'url(#line-gradient)');
    }
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
