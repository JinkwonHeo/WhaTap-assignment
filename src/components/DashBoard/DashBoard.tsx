import { useContext, useEffect } from 'react';
import { DispatchContext } from '../../reducer/context';
import {
  updateActiveStatus,
  updateInformatics,
  updateSimultaneousUser,
  updateTodayUsers,
  updateTpsData,
  updateYesterdayUsers,
} from '../../reducer/action';
import api from '../../api';
import useInterval from '../../hooks/useInterval';
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

  async function fetchApi() {
    const tpsData = await api.spot('tps');
    const simultaneousUser = await api.spot('user');
    const actAgentData = await api.spot('act_agent');
    const inActAgentData = await api.spot('inact_agent');
    const cpuCoreData = await api.spot('cpucore');
    const hostsData = await api.spot('host');
    const activeMethodData = await api.spot('act_method');
    const activeSqlData = await api.spot('act_sql');
    const activeHttpcData = await api.spot('act_httpc');
    const activeDbcData = await api.spot('act_dbc');
    const activeSocketData = await api.spot('act_socket');
    const yesterdayUsers = await api.series('visitor_5m/{stime}/{etime}', {
      stime: TODAY_MIDNIGHT - DAY,
      etime: TODAY_MIDNIGHT,
    });
    const todayUsers = await api.series('visitor_5m/{stime}/{etime}', {
      stime: TODAY_MIDNIGHT,
      etime: Date.now(),
    });
    const informaticsData = {
      actAgent: {
        data: actAgentData.data,
      },
      inActAgent: {
        data: inActAgentData.data,
      },
      cpuCore: {
        data: cpuCoreData.data,
      },
      hosts: {
        data: hostsData.data,
      },
      error: '',
    };

    const activeStatusData = {
      activeMethod: {
        data: activeMethodData.data,
      },
      activeSql: {
        data: activeSqlData.data,
      },
      activeHttpc: {
        data: activeHttpcData.data,
      },
      activeDbc: {
        data: activeDbcData.data,
      },
      activeSocket: {
        data: activeSocketData.data,
      },
      error: '',
    };

    dispatch(updateTpsData(tpsData.data));
    dispatch(updateSimultaneousUser(simultaneousUser.data));
    dispatch(updateYesterdayUsers(yesterdayUsers.data.data));
    dispatch(updateTodayUsers(todayUsers.data.data));
    dispatch(updateInformatics(informaticsData));
    dispatch(updateActiveStatus(activeStatusData));
  }

  useEffect(() => {
    fetchApi();
  }, []);

  useInterval(fetchApi, 5000);

  return (
    <>
      <Container>
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
      </Container>
    </>
  );
}
