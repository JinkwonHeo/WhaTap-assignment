const DEMO_PROJECT_API_TOCKEN = 'XGJHUSQZTI2AVIENWA27HI5V';
const DEMO_PROJECT_CODE = 5490;
const OPEN_API_HEADERS = {
  'x-whatap-pcode': String(DEMO_PROJECT_CODE),
  'x-whatap-token': DEMO_PROJECT_API_TOCKEN,
};
const OPEN_API_ROOT = 'https://service.whatap.io/open/api';
const requestHeaders: HeadersInit = new Headers(OPEN_API_HEADERS);

interface IParamType {
  [key: number]: any;
  [key: string]: any;
}

const OPEN_API: IParamType = {
  '': {
    act_agent: '활성화 상태의 에이전트 수',
    inact_agent: '비활성화 상태의 에이전트 수',
    host: '호스트 수',
    cpucore: '호스트의 CPU 코어 합',
    txcount: '트랜잭션 수',
    tps: '초당 트랜잭션 수',
    user: '5분간 집계된 고유 사용자 수',
    actx: '액티브 트랜잭션 수',
    rtime: '평균 응답 시간',
    cpu: 'CPU 사용률',
    threadpool_active: '쓰레드풀 활성 쓰레드 수',
    threadpool_queue: '쓰레드풀 큐잉 쓰레드 수',
    dbc_count: '전체 DB Connection 수',
    dbc_active: '활성(Active) DB Connection 수',
    dbc_idle: '비활성(Idle) DB Connection 수',
    act_method: '액티브 Method 수',
    act_sql: '액티브 SQL 수',
    act_httpc: '액티브 HTTP Call 수',
    act_dbc: '액티브 DB Connection 수',
    act_socket: '액티브 Socket 수',
  },
  json: {
    'exception/{stime}/{etime}': 'Exception 발생 ',
    'sql/{stime}/{etime}': 'SQL 발행',
    'transaction/{stime}/{etime}': 'Transaction 발생',
    'thread_count/{stime}/{etime}': 'thread_count',
    'thread_count/{stime}/{etime}/avg': 'thread_count average',
    'visitor_5m/{stime}/{etime}': '액티브 사용자(5분 단위)',
    project: 'Project 정보',
  },
};

const getPath = (url: string, param?: IParamType) => {
  let path = url;

  for (const key in param) {
    path = path.replace(new RegExp('\\{' + key + '\\}', 'g'), param[key]);
  }

  return path;
};

const getOpenApi = (type: string) => async (key: string, param?: IParamType) => {
  let url = '';
  let name = '';

  try {
    if (key in OPEN_API[type]) {
      if (type === '') {
        url = [OPEN_API_ROOT, key].join('/');
        name = OPEN_API[type][key];
      } else {
        url = [OPEN_API_ROOT, type, key].join('/');
        name = OPEN_API[type][key];
      }
    } else {
      throw new Error('잘못된 API 정보');
    }
  } catch (error) {
    console.error(error);
  }

  const response = await fetch(getPath(url, param), {
    headers: requestHeaders,
  });

  const data = await response.json();

  return { key, name, data };
};

const spot = getOpenApi(''); // spot 정보 조회
const series = getOpenApi('json'); // 통계 정보 조회

export default { spot, series };
