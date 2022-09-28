import React, { createContext, useReducer } from 'react';
import reducer from './reducer';
import { State, DataDispatch } from './types';

const INITIAL_STATE = {
  tps: {
    data: [],
    error: '',
  },
  actAgent: {
    data: 0,
    error: '',
  },
  inActAgent: {
    data: 0,
    error: '',
  },
  cpuCore: {
    data: 0,
    error: '',
  },
  hosts: {
    data: 0,
    error: '',
  },
  activeMethod: {
    data: 0,
    error: '',
  },
  activeSql: {
    data: 0,
    error: '',
  },
  activeHttpc: {
    data: 0,
    error: '',
  },
  activeDbc: {
    data: 0,
    error: '',
  },
  activeSocket: {
    data: 0,
    error: '',
  },
  simultaneousUser: {
    data: [],
    error: '',
  },
  yesterdayUsers: {
    data: [],
    error: '',
  },
  todayUsers: {
    data: [],
    error: '',
  },
};

export const DataContext = createContext<State>(INITIAL_STATE);
export const DispatchContext = createContext<DataDispatch>(() => null);

function DataProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <DataContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </DataContext.Provider>
  );
}

export default DataProvider;
