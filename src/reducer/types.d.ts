import { Dispatch } from 'react';
import { DataActionTypes } from './actionTypes';

type State = {
  tps: ITps;
  actAgent: IAgent;
  inActAgent: IAgent;
  cpuCore: ICpuCore;
  hosts: IHosts;
};

type Action = IUpdateActAgent | IUpdateTpsDataAction | IUpdateInActAgent | ICpuCoreAction;

interface IUpdateTpsDataAction {
  type: DataActionTypes.UPDATE_TPS_DATA;
  data: number;
}

interface IUpdateActAgent {
  type: DataActionTypes.UPDATE_ACT_AGENT;
  data: number;
}

interface IUpdateInActAgent {
  type: DataActionTypes.UPDATE_INACT_AGENT;
  data: number;
}

interface ICpuCoreAction {
  type: DataActionTypes.UPDATE_CPU_CORE;
  data: number;
}

type DataDispatch = Dispatch<Action>;

interface ITps {
  data: {
    timeStamp: number;
    data: number;
  }[];
  error?: string;
}

interface IAgent {
  data: number;
  error?: string;
}

interface ICpuCore {
  data: number;
  error?: string;
}

interface IHosts {
  data: number;
  error?: string;
}

export { State, Action, DataDispatch, ITps };
