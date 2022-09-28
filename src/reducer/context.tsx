import React, { createContext, useReducer } from 'react';
import reducer from './reducer';
import { State, DataDispatch } from './types';

const INITIAL_STATE = {
  tps: {
    data: [],
    error: '',
  },
  informatics: {
    actAgent: {
      data: 0,
    },
    inActAgent: {
      data: 0,
    },
    cpuCore: {
      data: 0,
    },
    hosts: {
      data: 0,
    },
    error: '',
  },
  activeStatus: {
    activeMethod: {
      data: 0,
    },
    activeSql: {
      data: 0,
    },
    activeHttpc: {
      data: 0,
    },
    activeDbc: {
      data: 0,
    },
    activeSocket: {
      data: 0,
    },
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
  isLoading: true,
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
