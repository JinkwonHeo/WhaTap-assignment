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

    case DataActionTypes.UPDATE_INFORMATICS_DATA: {
      const nextState = produce(state, (draft: State) => {
        draft.informatics = action.data;
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_ACTIVE_STATUS_DATA: {
      const nextState = produce(state, (draft: State) => {
        draft.activeStatus = action.data;
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_SIMULTANEOUS_USER: {
      const date = Date.now();
      const dataWithTimeStamp = { timeStamp: date, data: Number(action.data) };

      const nextState = produce(state, (draft: State) => {
        draft.simultaneousUser.data.push(dataWithTimeStamp);

        if (draft.simultaneousUser.data.length > 120) draft.simultaneousUser.data.shift();
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_YESTERDAY_USERS: {
      const nextState = produce(state, (draft: State) => {
        draft.yesterdayUsers.data = action.data;
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_TODAY_USERS: {
      const nextState = produce(state, (draft: State) => {
        draft.todayUsers.data = action.data;
      });

      return nextState;
    }

    default:
      return state;
  }
}

export default reducer;
