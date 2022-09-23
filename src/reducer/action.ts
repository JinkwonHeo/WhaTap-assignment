import { DataActionTypes } from './types';

export const updateTpsData = (data: number) => {
  return {
    type: DataActionTypes.UPDATE_TPS_DATA,
    data: data,
  };
};
