import { useContext } from 'react';
import { DataContext } from '../../reducer/context';
import Informatics from '../Informatics/Informatics';
import { WidgetContainer } from '../shared/WidgetContainer';
import { Container } from '../shared/Container';
import useFetch from '../../hooks/useFetch';
import { MemoizedWidget } from '../Widget/Widget';

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
            <MemoizedWidget
              widgetType={'simultaneousUser'}
              chartType={'line'}
              title={'동시접속 사용자'}
            />
          </WidgetContainer>
          <WidgetContainer>
            <MemoizedWidget widgetType={'tps'} chartType={'line'} title={'TPS'} />
          </WidgetContainer>
          <WidgetContainer>
            <MemoizedWidget widgetType={'todayUsers'} chartType={'line'} title={'금일 사용자'} />
          </WidgetContainer>
          <WidgetContainer>
            <Informatics />
            <MemoizedWidget
              widgetType={'activeStatus'}
              chartType={'bar'}
              title={'액티브 스테이터스'}
            />
          </WidgetContainer>
        </>
      )}
    </Container>
  );
}
