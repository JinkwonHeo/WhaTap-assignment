import { DataActionTypes } from './actionTypes';
import { IFetchedData } from './types';

export const updateLoadingStatus = (data: boolean) => {
  return {
    type: DataActionTypes.UPDATE_LOADING_STATUS,
    data,
  };
};

export const updateSpotData = (data: IFetchedData) => {
  return {
    type: DataActionTypes.UPDATE_SPOT_DATA,
    data,
  };
};

export const updateSeriesData = (data: IFetchedData) => {
  return {
    type: DataActionTypes.UPDATE_SERIES_DATA,
    data,
  };
};

export const updateQueue = (data: any) => {
  return {
    type: DataActionTypes.UPDATE_QUEUE,
    data,
  };
};

export const updateFetchedStatus = (data: boolean, key: string) => {
  return {
    type: DataActionTypes.UPDATE_FETCHED_STATUS,
    data,
    key,
  };
};
