import { Dispatch } from 'react';
import { DataActionTypes } from './actionTypes';

type State = {
  tps: ITps;
  informatics: IInformatics;
  activeStatus: IActiveStatus;
  simultaneousUser: ISimultaneousUser;
  yesterdayUsers: ITodayYesterdayUser;
  todayUsers: ITodayYesterdayUser;
  isLoading: boolean;
};

type Action =
  | ReturnType<typeof updateYesterdayUsers>
  | ReturnType<typeof updateTpsData>
  | ReturnType<typeof updateSimultaneousUser>;

interface IUpdateTpsDataAction {
  type: DataActionTypes.UPDATE_TPS_DATA;
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

interface IInformatics {
  actAgent: {
    data: number;
  };
  inActAgent: {
    data: number;
  };
  cpuCore: {
    data: number;
  };
  hosts: {
    data: number;
  };
  error?: string;
}

interface IActiveStatus {
  activeMethod: {
    data: number;
  };
  activeSql: {
    data: number;
  };
  activeHttpc: {
    data: number;
  };
  activeDbc: {
    data: number;
  };
  activeSocket: {
    data: number;
  };
  error: string;
}

interface ISimultaneousUser {
  data: {
    timeStamp: number;
    data: number;
  }[];
  error?: string;
}

interface ITodayYesterdayUser {
  data: any;
  error?: string;
}

export { State, Action, DataDispatch, ITps, IActiveStatus, IInformatics };
