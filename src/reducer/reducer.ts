import { Action, State } from './types';
import { DataActionTypes } from './actionTypes';
import produce from 'immer';
import { SECOND } from '../constants';

function reducer(state: State, action: Action) {
  switch (action.type) {
    case DataActionTypes.UPDATE_LOADING_STATUS: {
      const nextState = produce(state, (draft: State) => {
        draft.isLoading = action.data;
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_SPOT_DATA: {
      const nextState = produce(state, (draft: State) => {
        if (action.data.fetchName === 'activeStatus') {
          if (action.data.promiseAllResponse.includes(undefined)) {
            return state;
          }

          draft.activeStatus.data = action.data.promiseAllResponse;
          draft.activeStatus.key = action.data.fetchName;
        }

        if (action.data.fetchName === 'informatics') {
          if (action.data.promiseAllResponse.includes(undefined)) {
            return state;
          }

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
            if (!state.tps.data.length) {
              const initialData = [];

              for (let i = 119; i > -1; i--) {
                initialData.push({
                  timeStamp: date - SECOND * 5 * i,
                  data: isNaN(action.data.promiseAllResponse[0])
                    ? state.tps.data[state.tps.data.length - 1].data
                    : Number(action.data.promiseAllResponse[0]),
                });
              }

              draft.tps.key = action.data.fetchName;
              draft.tps.data = initialData;
            } else {
              draft.tps.key = action.data.fetchName;
              draft.tps.data.push(dataWithTimeStamp);

              if (draft.tps.data.length > 120) {
                draft.tps.data.shift();
              }
            }
          });

          return nextState;
        }

        if (action.data.fetchName === 'simultaneousUser') {
          const date = Date.now();
          const dataWithTimeStamp = {
            timeStamp: date,
            data: isNaN(action.data.promiseAllResponse[0])
              ? state.simultaneousUser.data[state.simultaneousUser.data.length - 1].data
              : Number(action.data.promiseAllResponse[0]),
          };

          const nextState = produce(state, (draft: State) => {
            if (!state.simultaneousUser.data.length) {
              const initialData = [];

              for (let i = 119; i > -1; i--) {
                initialData.push({
                  timeStamp: date - SECOND * 5 * i,
                  data: isNaN(action.data.promiseAllResponse[0])
                    ? state.simultaneousUser.data[state.simultaneousUser.data.length - 1].data
                    : Number(action.data.promiseAllResponse[0]),
                });
              }

              draft.simultaneousUser.key = action.data.fetchName;
              draft.simultaneousUser.data = initialData;
            } else {
              draft.simultaneousUser.key = action.data.fetchName;
              draft.simultaneousUser.data.push(dataWithTimeStamp);

              if (draft.simultaneousUser.data.length > 120) {
                draft.simultaneousUser.data.shift();
              }
            }
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

    case DataActionTypes.UPDATE_QUEUE: {
      const nextState = produce(state, (draft: State) => {
        if (action.data.length === 0) {
          draft.queue = [];
        } else {
          draft.queue.push(action.data);
        }
      });

      return nextState;
    }

    case DataActionTypes.UPDATE_FETCHED_STATUS: {
      const nextState = produce(state, (draft: State) => {
        if (action.key === 'tps') {
          draft.tps.isFetched = action.data;
        }

        if (action.key === 'activeStatus') {
          draft.activeStatus.isFetched = action.data;
        }

        if (action.key === 'simultaneousUser') {
          draft.simultaneousUser.isFetched = action.data;
        }

        if (action.key === 'todayUsers') {
          draft.todayUsers.isFetched = action.data;
        }

        if (action.key === 'informatics') {
          draft.informatics.isFetched = action.data;
        }
      });

      return nextState;
    }

    default:
      return state;
  }
}

export default reducer;
