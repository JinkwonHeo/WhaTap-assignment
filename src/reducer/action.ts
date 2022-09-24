import { DataActionTypes } from './actionTypes';

export const updateTpsData = (data: number) => {
  return {
    type: DataActionTypes.UPDATE_TPS_DATA,
    data,
  };
};

export const updateActAgent = (data: number) => {
  return {
    type: DataActionTypes.UPDATE_ACT_AGENT,
    data,
  };
};

export const updateInActAgent = (data: number) => {
  return {
    type: DataActionTypes.UPDATE_INACT_AGENT,
    data,
  };
};

export const updateCpuCore = (data: number) => {
  return {
    type: DataActionTypes.UPDATE_CPU_CORE,
    data,
  };
};

export const updateHosts = (data: number) => {
  return {
    type: DataActionTypes.UPDATE_HOSTS,
    data,
  };
};
