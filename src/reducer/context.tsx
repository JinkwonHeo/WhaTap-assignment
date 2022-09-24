import React, { createContext, useReducer } from 'react';
import reducer from './reducer';
import { State, DataDispatch } from './types';

const INITIAL_STATE = {
  tps: {
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
