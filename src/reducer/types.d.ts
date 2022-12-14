import { Dispatch } from 'react';
import { DataActionTypes } from './actionTypes';

type State = {
  tps: ITps;
  informatics: IInformatics;
  activeStatus: IActiveStatus;
  simultaneousUser: ISimultaneousUser;
  yesterdayUsers: ITodayYesterdayUser;
  todayUsers: ITodayYesterdayUser;
  queue: IQueue[];
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
  isFetched: boolean;
  key: string;
  error?: string;
}

interface IInformatics {
  data: number[];
  key: string;
  isFetched: boolean;
  error?: string;
}

interface IActiveStatus {
  data: number[];
  key: string;
  isFetched: boolean;
  error?: string;
}

interface ISimultaneousUser {
  data: {
    timeStamp: number;
    data: number;
  }[];
  isFetched: boolean;
  key: string;
  error?: string;
}

interface ITodayYesterdayUser {
  data: any;
  isFetched: boolean;
  key: string;
  error?: string;
}

interface IFetchedData {
  key: string[];
  fetchName: string;
  promiseAllResponse: any[];
}

interface IQueue {
  fetchType: string;
  fetchName: string;
  promiseAllKey: string[];
  params?: {
    stime: number;
    etime: number;
  };
}

export { State, Action, DataDispatch, IFetchedData };
