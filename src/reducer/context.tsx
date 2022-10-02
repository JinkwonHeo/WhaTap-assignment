import React, { createContext, useContext, useMemo, useReducer, useState } from 'react';
import reducer from './reducer';
import { State, DataDispatch } from './types';
import { TODAY_MIDNIGHT } from '../constants';

const INITIAL_STATE = {
  tps: {
    data: [],
    isFetched: false,
    key: '',
    error: '',
  },
  informatics: {
    data: [],
    isFetched: false,
    key: '',
    error: '',
  },
  activeStatus: {
    data: [],
    isFetched: false,
    key: '',
    error: '',
  },
  simultaneousUser: {
    data: [],
    isFetched: false,
    key: '',
    error: '',
  },
  yesterdayUsers: {
    data: [],
    isFetched: false,
    key: '',
    error: '',
  },
  todayUsers: {
    data: [],
    isFetched: false,
    key: '',
    error: '',
  },
  queue: [
    {
      fetchType: 'spot',
      fetchName: 'tps',
      promiseAllKey: ['tps'],
    },
    {
      fetchType: 'spot',
      fetchName: 'simultaneousUser',
      promiseAllKey: ['user'],
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
    {
      fetchType: 'spot',
      fetchName: 'activeStatus',
      promiseAllKey: ['act_method', 'act_sql', 'act_httpc', 'act_dbc', 'act_socket'],
    },
  ],
  isLoading: true,
};

export const DataContext = createContext<State>(INITIAL_STATE);
export const DispatchContext = createContext<DataDispatch>(() => null);

export default function DataProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const memoizedState = useMemo(() => {
    return state;
  }, [state]);

  const memoizedDispatch = useMemo(() => {
    return dispatch;
  }, [dispatch]);

  return (
    <DataContext.Provider value={memoizedState}>
      <DispatchContext.Provider value={memoizedDispatch}>{children}</DispatchContext.Provider>
    </DataContext.Provider>
  );
}
