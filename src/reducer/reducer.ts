import { Action, State } from './types';
import { DataActionTypes } from './actionTypes';
import produce from 'immer';

function reducer(state: State, action: Action) {
  console.log(state);
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

    default:
      return state;
  }
}

export default reducer;
