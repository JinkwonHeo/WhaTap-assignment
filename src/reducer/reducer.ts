import { Action, State } from './types';
import { DataActionTypes } from './actionTypes';
import produce from 'immer';

function reducer(state: State, action: Action) {
  switch (action.type) {
    case DataActionTypes.UPDATE_TPS_DATA: {
      const date = Date.now();
      const dataWithTimeStamp = { timeStamp: date, data: Number(action.data) };

      const nextState = produce(state, (draft: State) => {
        draft.tps.data.push(dataWithTimeStamp);

        if (draft.tps.data.length > 120) draft.tps.data.shift();
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_ACT_AGENT: {
      const nextState = produce(state, (draft: State) => {
        if (draft.actAgent.data === action.data) return;

        draft.actAgent.data = action.data;
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_INACT_AGENT: {
      const nextState = produce(state, (draft: State) => {
        if (draft.inActAgent.data === action.data) return;

        draft.inActAgent.data = action.data;
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_CPU_CORE: {
      const nextState = produce(state, (draft: State) => {
        if (draft.cpuCore.data === action.data) return;

        draft.cpuCore.data = action.data;
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_HOSTS: {
      const nextState = produce(state, (draft: State) => {
        if (draft.hosts.data === action.data) return;

        draft.hosts.data = action.data;
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_ACTIVE_METHOD: {
      const nextState = produce(state, (draft: State) => {
        if (draft.activeMethod.data === action.data) return;

        draft.activeMethod.data = action.data;
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_ACTIVE_SQL: {
      const nextState = produce(state, (draft: State) => {
        if (draft.activeSql.data === action.data) return;

        draft.activeSql.data = action.data;
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_ACTIVE_HTTPC: {
      const nextState = produce(state, (draft: State) => {
        if (draft.activeHttpc.data === action.data) return;

        draft.activeHttpc.data = action.data;
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_ACTIVE_DBC: {
      const nextState = produce(state, (draft: State) => {
        if (draft.activeDbc.data === action.data) return;

        draft.activeDbc.data = action.data;
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_ACTIVE_SOCKET: {
      const nextState = produce(state, (draft: State) => {
        if (draft.activeSocket.data === action.data) return;

        draft.activeSocket.data = action.data;
      });

      return nextState;
    }

    default:
      return state;
  }
}

export default reducer;
