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

    case DataActionTypes.UPDATE_LOADING_STATUS: {
      const nextState = produce(state, (draft: State) => {
        draft.isLoading = action.data;
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_SPOT_DATA: {
      const nextState = produce(state, (draft: State) => {
        if (action.data.fetchName === 'activeStatus') {
          draft.activeStatus.data = action.data.promiseAllResponse;
          draft.activeStatus.key = action.data.fetchName;
        }

        if (action.data.fetchName === 'informatics') {
          draft.informatics.data = action.data.promiseAllResponse;
          draft.informatics.key = action.data.fetchName;
        }

        if (action.data.fetchName === 'tps') {
          const date = Date.now();
          const dataWithTimeStamp = {
            timeStamp: date,
            data: isNaN(action.data.promiseAllResponse[0])
              ? state.tps.data[state.tps.data.length - 1].data
              : Number(action.data.promiseAllResponse[0]),
          };

          const nextState = produce(state, (draft: State) => {
            draft.tps.key = action.data.fetchName;
            draft.tps.data.push(dataWithTimeStamp);

            if (draft.tps.data.length > 120) draft.tps.data.shift();
          });

          return nextState;
        }

        if (action.data.fetchName === 'user') {
          const date = Date.now();
          const dataWithTimeStamp = {
            timeStamp: date,
            data: isNaN(action.data.promiseAllResponse[0])
              ? state.simultaneousUser.data[state.simultaneousUser.data.length - 1].data
              : Number(action.data.promiseAllResponse[0]),
          };

          const nextState = produce(state, (draft: State) => {
            draft.simultaneousUser.key = action.data.fetchName;
            draft.simultaneousUser.data.push(dataWithTimeStamp);

            if (draft.simultaneousUser.data.length > 120) draft.simultaneousUser.data.shift();
          });

          return nextState;
        }
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_SERIES_DATA: {
      const nextState = produce(state, (draft: State) => {
        if (action.data.fetchName === 'yesterdayUsers') {
          draft.yesterdayUsers.key = action.data.fetchName;
          draft.yesterdayUsers.data = action.data.promiseAllResponse[0].data;
        }

        if (action.data.fetchName === 'todayUsers') {
          draft.todayUsers.key = action.data.fetchName;
          draft.todayUsers.data = action.data.promiseAllResponse[0].data;
        }
      });

      return nextState;
    }

    default:
      return state;
  }
}

export default reducer;
