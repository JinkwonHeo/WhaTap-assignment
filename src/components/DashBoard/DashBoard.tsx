import { useState } from 'react';
import api from '../../api';
import useInterval from '../../hooks/useInterval';

export default function DashBoard() {
  const [tpsData, setTpsData] = useState<any>([]);

  async function fetchApi() {
    const response = await api.spot('tps');

    console.log(response);
    setTpsData([...tpsData, response.data]);
  }

  // useInterval(fetchApi, 5000);

  return <div>dashboard</div>;
}
