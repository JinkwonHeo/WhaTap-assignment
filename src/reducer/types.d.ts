export enum DataActionTypes {
  UPDATE_TPS_DATA = 'UPDATE_TPS_DATA',
}

export type State = {
  tps: ITps;
};

export type Action = { type: DataActionTypes.UPDATE_TPS_DATA; data: number };

type DataDispatch = Dispatch<Action>;

interface ITps {
  data: number[];
  error?: string;
}
