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
  yesterdayUsers: IYesterdayUsers;
};

type Action =
  | ReturnType<typeof updateYesterdayUsers>
  | ReturnType<typeof updateTpsData>
  | ReturnType<typeof updateActAgent>
  | ReturnType<typeof updateInActAgent>
  | ReturnType<typeof updateCpuCore>
  | ReturnType<typeof updateHosts>
  | ReturnType<typeof updateActiveMethod>
  | ReturnType<typeof updateActiveSql>
  | ReturnType<typeof updateActiveHttpc>
  | ReturnType<typeof updateActiveDbc>
  | ReturnType<typeof updateActiveSocket>
  | ReturnType<typeof updateSimultaneousUser>;

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

interface IYesterdayUsersUpdateAction {
  type: DataActionTypes.UPDATE_YESTERDAY_USERS;
  data: [number, number][];
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

interface IYesterdayUsers {
  data: any;
  error?: string;
}

export { State, Action, DataDispatch, ITps };
