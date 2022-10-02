const TODAY_MIDNIGHT = new Date().setHours(0, 0, 0);

const QUEUE_FORMAT = {
  tps: {
    fetchType: 'spot',
    fetchName: 'tps',
    promiseAllKey: ['tps'],
  },
  informatics: {
    fetchType: 'spot',
    fetchName: 'informatics',
    promiseAllKey: ['act_agent', 'inact_agent', 'cpucore', 'host'],
  },
  activeStatus: {
    fetchType: 'spot',
    fetchName: 'activeStatus',
    promiseAllKey: ['act_method', 'act_sql', 'act_httpc', 'act_dbc', 'act_socket'],
  },
  simultaneousUser: {
    fetchType: 'spot',
    fetchName: 'simultaneousUser',
    promiseAllKey: ['user'],
  },
  todayUsers: {
    fetchType: 'series',
    fetchName: 'todayUsers',
    promiseAllKey: ['visitor_5m/{stime}/{etime}'],
    params: {
      stime: TODAY_MIDNIGHT,
      etime: Date.now(),
    },
  },
};

export { QUEUE_FORMAT };
