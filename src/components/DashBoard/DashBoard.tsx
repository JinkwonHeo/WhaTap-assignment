import { useContext } from 'react';
import { DataContext } from '../../reducer/context';
import Informatics from '../Informatics/Informatics';
import { WidgetContainer } from '../shared/WidgetContainer';
import { Container } from '../shared/Container';
import useFetch from '../../hooks/useFetch';
import { MemoizedWidget } from '../Widget/Widget';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import { WIDGET_INFORMATION } from '../../constants';

export default function DashBoard() {
  const { isLoading } = useContext(DataContext);

  useFetch();

  return (
    <>
      {isLoading ? (
        <LoadingCircle />
      ) : (
        <Container>
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
          <WidgetContainer>
            <Informatics />
            <MemoizedWidget
              widgetType={'activeStatus'}
              chartType={'bar'}
              title={'액티브 스테이터스'}
              information={WIDGET_INFORMATION.activeStatus}
            />
          </WidgetContainer>
        </Container>
      )}
    </>
  );
}
