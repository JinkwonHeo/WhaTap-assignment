import { useContext } from 'react';
import { DataContext } from '../../reducer/context';
import Informatics from '../Informatics/Informatics';
import { WidgetContainer } from '../shared/WidgetContainer';
import { Container } from '../shared/Container';
import useFetch from '../../hooks/useFetch';
import { MemoizedWidget } from '../Widget/Widget';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import { WIDGET_INFORMATION } from '../../constants';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import styled from 'styled-components';

export default function DashBoard({
  isDarkMode,
  toggleDarkMode,
}: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}) {
  const { isLoading } = useContext(DataContext);

  useFetch();

  return (
    <>
      {isLoading ? (
        <LoadingCircle />
      ) : (
        <>
          <DarkModeIcon onClick={() => toggleDarkMode()}>
            {isDarkMode ? <MdOutlineLightMode size={'2rem'} /> : <MdDarkMode size={'2rem'} />}
          </DarkModeIcon>
          <Container>
            <Title>WhaTap DashBoard</Title>
            <WidgetContainer>
              <Informatics />
              <MemoizedWidget
                widgetType={'activeStatus'}
                chartType={'bar'}
                title={'액티브 스테이터스'}
                information={WIDGET_INFORMATION.activeStatus}
              />
            </WidgetContainer>
            <LineChartFlexContainer>
              <WidgetContainer>
                <MemoizedWidget
                  widgetType={'simultaneousUser'}
                  chartType={'line'}
                  title={'동시접속 사용자'}
                  information={WIDGET_INFORMATION.simultaneousUser}
                />
              </WidgetContainer>
              <WidgetContainer>
                <MemoizedWidget
                  widgetType={'tps'}
                  chartType={'line'}
                  title={'TPS'}
                  information={WIDGET_INFORMATION.tps}
                />
              </WidgetContainer>
              <WidgetContainer>
                <MemoizedWidget
                  widgetType={'todayUsers'}
                  chartType={'line'}
                  title={'금일 사용자'}
                  information={WIDGET_INFORMATION.todayUsers}
                />
              </WidgetContainer>
            </LineChartFlexContainer>
          </Container>
        </>
      )}
    </>
  );
}

const DarkModeIcon = styled.span`
  position: absolute;
  top: 2rem;
  right: 2rem;
  float: right;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  padding: 2rem;
  font-family: Pretendard-bold;
  font-size: 3rem;

  @media screen and (max-width: 500px) {
    font-size: 2rem;
  }
`;

const LineChartFlexContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;
