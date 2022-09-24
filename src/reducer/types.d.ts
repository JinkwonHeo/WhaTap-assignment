import { Dispatch } from 'react';
import { DataActionTypes } from './actionTypes';

type State = {
  tps: ITps;
};

type Action = { type: DataActionTypes.UPDATE_TPS_DATA; data: ITpsData };

type DataDispatch = Dispatch<Action>;

interface ITpsData {
  timeStamp: date;
  data: number;
}

interface ITps {
  data: ITpsData[];
  error?: string;
}

export { State, Action, DataDispatch, ITps, ITpsData };
