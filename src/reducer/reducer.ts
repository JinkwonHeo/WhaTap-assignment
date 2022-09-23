import { Action, State } from './context';

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'UPDATE_TPS_DATA':
      return {
        ...state,
        tps: {
          data: [...state.tps.data, action.data],
        },
      };
    default:
      return state;
  }
}

export default reducer;
