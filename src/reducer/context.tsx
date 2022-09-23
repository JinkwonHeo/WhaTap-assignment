import React, { useContext, useState, createContext, useReducer, Dispatch } from 'react';
import reducer from './reducer';

export enum DataActionTypes {
  UPDATE_TPS_DATA = 'UPDATE_TPS_DATA',
}

export type State = {
  tps: ITps;
};

export type Action = { type: DataActionTypes.UPDATE_TPS_DATA; data: number };

type DataDispatch = Dispatch<Action>;

interface ITps {
  data: number[];
  error?: string;
}

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

export const PermissionState = () => {
  return useContext(DataContext);
};

export default DataProvider;
