import { DataActionTypes } from './context';

export const updateTpsData = (data: number) => {
  return {
    type: DataActionTypes.UPDATE_TPS_DATA,
    data: data,
  };
};
