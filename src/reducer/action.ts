import { DataActionTypes } from './actionTypes';
import { ITpsData } from './types';

export const updateTpsData = (data: ITpsData) => {
  return {
    type: DataActionTypes.UPDATE_TPS_DATA,
    data: data,
  };
};
