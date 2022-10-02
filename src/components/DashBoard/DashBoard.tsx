import { useContext } from 'react';
import { DataContext } from '../../reducer/context';
import TPSLineChart from '../TPSLineChart/TPSLineChart';
import Informatics from '../Informatics/Informatics';
import ActiveStatusBarChart from '../ActiveStatusBarChart/ActiveStatusBarChart';
import { WidgetContainer } from '../shared/WidgetContainer';
import { Container } from '../shared/Container';
import SimultaneousUserLineChart from '../SimultaneousUserLineChart/SimultaneousUserLineChart';
import TodayUsersLineChart from '../TodayUsersLineChart/TodayUsersLineChart';
import useFetch from '../../hooks/useFetch';

export default function DashBoard() {
  const { isLoading } = useContext(DataContext);

  useFetch();

  return (
    <Container>
      {isLoading ? (
        'loading...'
      ) : (
        <>
          <WidgetContainer>
            <Informatics />
            <ActiveStatusBarChart />
          </WidgetContainer>
          <WidgetContainer>
            <TodayUsersLineChart />
          </WidgetContainer>
          <WidgetContainer>
            <TPSLineChart />
          </WidgetContainer>
          <WidgetContainer>
            <SimultaneousUserLineChart />
          </WidgetContainer>
        </>
      )}
    </Container>
  );
}
