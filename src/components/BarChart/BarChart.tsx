import { useRef, useEffect } from 'react';
import { select, scaleBand, scaleLinear, max, axisLeft } from 'd3';
import useResizeObserver from '../../hooks/useResizeOBserver';
import { IBarChartData, INode } from './type';
import styled from 'styled-components';

export default function BarChart({
  data,
  maxValue,
}: {
  data: IBarChartData[];
  maxValue: number | undefined;
}) {
  const svgRef = useRef(null);
  const wrappedRef = useRef(null);
  const dimensions = useResizeObserver(wrappedRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const xScale = scaleLinear()
      .domain([0, maxValue ? maxValue : 100])
      .range([0, dimensions.width]);
    const yScale: any = scaleBand<number>()
      .paddingInner(0.2)
      .paddingOuter(0.1)
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
      .text((entry) => `${entry.name}`)
      .style('fill', '#767676')
      .attr('class', 'label')
      .attr('x', 10)
      .transition()
      .attr('y', (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 6);
  }, [data, dimensions]);

  return (
    <>
      <BarChartText>액티브 스테이터스</BarChartText>
      <SvgWrapper ref={wrappedRef}>
        <BarChartSvg ref={svgRef}>
          <BarChartGroup className="value-axis" />
        </BarChartSvg>
      </SvgWrapper>
    </>
  );
}

const SvgWrapper = styled.div`
  height: 100%;
  padding-top: 0.6rem;
  padding-left: 30px;
`;

const BarChartSvg = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
`;

const BarChartText = styled.span`
  font-family: Pretendard-medium;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const BarChartGroup = styled.g`
  font-family: Pretendard-medium;
  font-size: 1rem;
`;
