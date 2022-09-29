import { DataActionTypes } from './actionTypes';
import { IActiveStatus, IInformatics } from './types';

export const updateTpsData = (data: number) => {
  return {
    type: DataActionTypes.UPDATE_TPS_DATA,
    data,
  };
};

export const updateInformatics = (data: IInformatics) => {
  return {
    type: DataActionTypes.UPDATE_INFORMATICS_DATA,
    data,
  };
};

export const updateActiveStatus = (data: IActiveStatus) => {
  return {
    type: DataActionTypes.UPDATE_ACTIVE_STATUS_DATA,
    data,
  };
};

export const updateSimultaneousUser = (data: number) => {
  return {
    type: DataActionTypes.UPDATE_SIMULTANEOUS_USER,
    data,
  };
};

export const updateYesterdayUsers = (data: [number, number][]) => ({
  type: DataActionTypes.UPDATE_YESTERDAY_USERS,
  data,
});

export const updateTodayUsers = (data: [number, number][]) => ({
  type: DataActionTypes.UPDATE_TODAY_USERS,
  data,
});

export const updateLoadingStatus = (data: boolean) => {
  return {
    type: DataActionTypes.UPDATE_LOADING_STATUS,
    data,
  };
};
