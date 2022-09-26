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

export const updateActiveMethod = (data: number) => {
  return {
    type: DataActionTypes.UPDATE_ACTIVE_METHOD,
    data,
  };
};

export const updateActiveSql = (data: number) => {
  return {
    type: DataActionTypes.UPDATE_ACTIVE_SQL,
    data,
  };
};

export const updateActiveHttpc = (data: number) => {
  return {
    type: DataActionTypes.UPDATE_ACTIVE_HTTPC,
    data,
  };
};

export const updateActiveDbc = (data: number) => {
  return {
    type: DataActionTypes.UPDATE_ACTIVE_DBC,
    data,
  };
};

export const updateActiveSocket = (data: number) => {
  return {
    type: DataActionTypes.UPDATE_ACTIVE_SOCKET,
    data,
  };
};

export const updateSimultaneousUser = (data: number) => {
  return {
    type: DataActionTypes.UPDATE_SIMULTANEOUS_USER,
    data,
  };
};
