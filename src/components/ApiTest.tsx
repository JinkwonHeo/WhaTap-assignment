import { useEffect, useState } from 'react';
import api from '../api';
import { IResult } from '../types/interface';

const SECOND = 1000;
const MINUTE = 1000 * 60;
const HOUR = 1000 * 60 * 60;

export default function ApiTest() {
  const [actAgent, setActAgent] = useState<IResult>({ key: '', name: '', data: undefined });
  const [httpcSeries, setHttpcSeries] = useState<IResult>({ key: '', name: '', data: undefined });

  useEffect(() => {
    api.spot('tps').then((result) => setActAgent(result));
    // api.spot('act_agent').then((result) => console.log(result));
    // api.series('project').then((result) => console.log(result));
    api
      .series('transaction/{stime}/{etime}', {
        stime: Date.now() - MINUTE * 10,
        etime: Date.now(),
      })
      .then((result) => setHttpcSeries(result));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Open API (Application)</h1>
      <a
        href="https://docs.whatap.io/kr/appendix/open_api_application.pdf"
        target="_blank"
        rel="noreferrer"
      >
        가이드 문서
      </a>
      <h2>프로젝트 API 예시</h2>
      <h3>Spot 정보 조회 URL</h3>
      <pre>{JSON.stringify(actAgent, null, 4)}</pre>
      <hr />
      <h3>통계 정보 조회 URL</h3>
      <pre>{JSON.stringify(httpcSeries, null, 4)}</pre>
    </div>
  );
}
