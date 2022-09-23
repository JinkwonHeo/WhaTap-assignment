import { Action, State, DataActionTypes } from './context';
import produce from 'immer';

function reducer(state: State, action: Action) {
  switch (action.type) {
    case DataActionTypes.UPDATE_TPS_DATA: {
      const nextState = produce(state, (draft: State) => {
        draft.tps.data.push(action.data);
      });

      return nextState;
    }
    default:
      return state;
  }
}

export default reducer;
