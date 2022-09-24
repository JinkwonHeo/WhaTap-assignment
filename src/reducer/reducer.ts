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
    default:
      return state;
  }
}

export default reducer;
