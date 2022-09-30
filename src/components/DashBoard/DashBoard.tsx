import { useContext, useLayoutEffect } from 'react';
import { DataContext, DispatchContext } from '../../reducer/context';
import { updateLoadingStatus, updateSeriesData, updateSpotData } from '../../reducer/action';
import api from '../../api';
import TPSLineChart from '../TPSLineChart/TPSLineChart';
import Informatics from '../Informatics/Informatics';
import ActiveStatusBarChart from '../ActiveStatusBarChart/ActiveStatusBarChart';
import { WidgetContainer } from '../shared/WidgetContainer';
import { Container } from '../shared/Container';
import SimultaneousUserLineChart from '../SimultaneousUserLineChart/SimultaneousUserLineChart';
import TodayUsersLineChart from '../TodayUsersLineChart/TodayUsersLineChart';
import { TODAY_MIDNIGHT, DAY } from '../../constants';

export default function DashBoard() {
  const dispatch = useContext(DispatchContext);
  const { isLoading } = useContext(DataContext);
  const queue: {
    fetchType: string;
    fetchName: string;
    promiseAllKey: string[];
    params?: { stime: number; etime: number };
  }[] = [
    {
      fetchType: 'spot',
      fetchName: 'tps',
      promiseAllKey: ['tps'],
    },
    {
      fetchType: 'spot',
      fetchName: 'user',
      promiseAllKey: ['user'],
    },
    {
      fetchType: 'spot',
      fetchName: 'activeStatus',
      promiseAllKey: ['act_method', 'act_sql', 'act_httpc', 'act_dbc', 'act_socket'],
    },
    {
      fetchType: 'series',
      fetchName: 'todayUsers',
      promiseAllKey: ['visitor_5m/{stime}/{etime}'],
      params: {
        stime: TODAY_MIDNIGHT,
        etime: Date.now(),
      },
    },
    {
      fetchType: 'spot',
      fetchName: 'informatics',
      promiseAllKey: ['act_agent', 'inact_agent', 'cpucore', 'host'],
    },
  ];

  async function fetchInitial() {
    const yesterdayUsers = await api.series(['visitor_5m/{stime}/{etime}'], 'yesterdayUsers', {
      stime: TODAY_MIDNIGHT - DAY,
      etime: TODAY_MIDNIGHT,
    });

    if (yesterdayUsers) {
      dispatch(updateSeriesData(yesterdayUsers));

      return setTimeout(fetchApi, 300);
    }
  }

  async function fetchApi(): Promise<any> {
    if (queue.length) {
      const queuedData = queue.shift()!;

      if (queuedData.fetchType === 'spot') {
        const fetchedData = await api.spot(queuedData.promiseAllKey, queuedData.fetchName);

        if (fetchedData) {
          dispatch(updateSpotData(fetchedData));

          return setTimeout(fetchApi, 300);
        }
      }

      if (queuedData.fetchType === 'series') {
        const fetchedData = await api.series(
          queuedData.promiseAllKey,
          queuedData.fetchName,
          queuedData.params
        );

        if (fetchedData) {
          dispatch(updateSeriesData(fetchedData));

          return setTimeout(fetchApi, 300);
        }
      }
    }
    dispatch(updateLoadingStatus(false));
  }

  useLayoutEffect(() => {
    const abortController = new AbortController();
    try {
      fetchInitial();

      let timerId = setTimeout(function tick() {
        queue.push({
          fetchType: 'spot',
          fetchName: 'tps',
          promiseAllKey: ['tps'],
        });

        queue.push({
          fetchType: 'spot',
          fetchName: 'user',
          promiseAllKey: ['user'],
        });

        queue.push({
          fetchType: 'spot',
          fetchName: 'activeStatus',
          promiseAllKey: ['act_method', 'act_sql', 'act_httpc', 'act_dbc', 'act_socket'],
        });

        queue.push({
          fetchType: 'spot',
          fetchName: 'informatics',
          promiseAllKey: ['act_agent', 'inact_agent', 'cpucore', 'host'],
        });

        fetchApi();
        timerId = setTimeout(tick, 5000);
      }, 5000);

      return () => {
        abortController.abort();
        clearTimeout(timerId);
      };
    } catch (error) {
      console.log(123123);
      queue.length = 0;
      console.error(error);
      let timerId = setTimeout(function tick() {
        queue.push({
          fetchType: 'spot',
          fetchName: 'tps',
          promiseAllKey: ['tps'],
        });

        queue.push({
          fetchType: 'spot',
          fetchName: 'user',
          promiseAllKey: ['user'],
        });

        queue.push({
          fetchType: 'spot',
          fetchName: 'activeStatus',
          promiseAllKey: ['act_method', 'act_sql', 'act_httpc', 'act_dbc', 'act_socket'],
        });

        queue.push({
          fetchType: 'spot',
          fetchName: 'informatics',
          promiseAllKey: ['act_agent', 'inact_agent', 'cpucore', 'host'],
        });

        fetchApi();
        timerId = setTimeout(tick, 5000);
      }, 5000);

      return () => {
        abortController.abort();
        clearTimeout(timerId);
      };
    }
  }, []);

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
