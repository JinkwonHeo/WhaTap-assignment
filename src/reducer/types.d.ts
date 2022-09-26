import { Dispatch } from 'react';
import { DataActionTypes } from './actionTypes';

type State = {
  tps: ITps;
  actAgent: IAgent;
  inActAgent: IAgent;
  cpuCore: ICpuCore;
  hosts: IHosts;
  activeMethod: IActiveMethod;
  activeSql: IActiveSql;
  activeHttpc: IActiveHttpc;
  activeDbc: IActiveDbc;
  activeSocket: IActiveSocket;
  simultaneousUser: ISimultaneousUser;
};

type Action =
  | IUpdateActAgent
  | IUpdateTpsDataAction
  | IUpdateInActAgent
  | ICpuCoreAction
  | IActiveMethodUpdateAction
  | IActiveSqlUpdateAction
  | IActiveHttpcUpdateAction
  | IActiveDbcUpdateAction
  | IActiveSocketUpdateAction;

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

interface IActiveMethodUpdateAction {
  type: DataActionTypes.UPDATE_ACTIVE_METHOD;
  data: number;
}

interface IActiveSqlUpdateAction {
  type: DataActionTypes.UPDATE_ACTIVE_SQL;
  data: number;
}

interface IActiveHttpcUpdateAction {
  type: DataActionTypes.UPDATE_ACTIVE_HTTPC;
  data: number;
}

interface IActiveDbcUpdateAction {
  type: DataActionTypes.UPDATE_ACTIVE_DBC;
  data: number;
}

interface IActiveSocketUpdateAction {
  type: DataActionTypes.UPDATE_ACTIVE_SOCKET;
  data: number;
}

interface ISimultaneousUserUpdateAction {
  type: DataActionTypes.UPDATE_SIMULTANEOUS_USER;
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

interface IActiveMethod {
  data: number;
  error?: string;
}

interface IActiveSql {
  data: number;
  error?: string;
}

interface IActiveHttpc {
  data: number;
  error?: string;
}

interface IActiveDbc {
  data: number;
  error?: string;
}

interface IActiveSocket {
  data: number;
  error?: string;
}

interface ISimultaneousUser {
  data: {
    timeStamp: number;
    data: number;
  }[];
  error?: string;
}

export { State, Action, DataDispatch, ITps };
