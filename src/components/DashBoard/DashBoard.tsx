import { useContext, useState } from 'react';
import { DispatchContext } from '../../reducer/context';
import { updateTpsData } from '../../reducer/action';
import api from '../../api';
import useInterval from '../../hooks/useInterval';

export default function DashBoard() {
  const dispatch = useContext(DispatchContext);

  async function fetchApi() {
    const response = await api.spot('tps');
    dispatch(updateTpsData(response.data));
  }

  useInterval(fetchApi, 5000);

  return <div>dashboard</div>;
}
