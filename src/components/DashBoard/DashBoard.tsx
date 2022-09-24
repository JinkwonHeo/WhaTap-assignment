import { useContext } from 'react';
import { DispatchContext } from '../../reducer/context';
import {
  updateActAgent,
  updateCpuCore,
  updateHosts,
  updateInActAgent,
  updateTpsData,
} from '../../reducer/action';
import api from '../../api';
import useInterval from '../../hooks/useInterval';
import TPSLineChart from '../TPSLineChart/TPSLineChart';
import Informatics from '../Informatics/Informatics';
import ApiTest from '../ApiTest';

export default function DashBoard() {
  const dispatch = useContext(DispatchContext);

  async function fetchApi() {
    const tpsData = await api.spot('tps');
    const actAgentData = await api.spot('act_agent');
    const inActAgentData = await api.spot('inact_agent');
    const cpuCoreData = await api.spot('cpucore');
    const hostsData = await api.spot('host');

    dispatch(updateTpsData(tpsData.data));
    dispatch(updateActAgent(actAgentData.data));
    dispatch(updateInActAgent(inActAgentData.data));
    dispatch(updateCpuCore(cpuCoreData.data));
    dispatch(updateHosts(hostsData.data));
  }

  useInterval(fetchApi, 5000);

  return (
    <>
      <Informatics />
      <TPSLineChart />
      <ApiTest />
    </>
  );
}
