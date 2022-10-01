import { useContext, useEffect } from 'react';
import { DAY, TODAY_MIDNIGHT } from '../constants';
import {
  updateFetchedStatus,
  updateLoadingStatus,
  updateQueue,
  updateSeriesData,
  updateSpotData,
} from '../reducer/action';
import { DataContext, DispatchContext } from '../reducer/context';
import useInterval from './useInterval';
import api from '../api';

export default function useFetch() {
  const dispatch = useContext(DispatchContext);
  const { queue } = useContext(DataContext);

  async function fetchInitial() {
    const yesterdayUsers = await api.series(['visitor_5m/{stime}/{etime}'], 'yesterdayUsers', {
      stime: TODAY_MIDNIGHT - DAY,
      etime: TODAY_MIDNIGHT,
    });

    if (yesterdayUsers) {
      dispatch(updateSeriesData(yesterdayUsers));

      return setTimeout(fetchApi, 50);
    }
  }

  async function fetchApi(): Promise<any> {
    if (queue.length) {
      for (let i = 0; i < queue.length + 1; i++) {
        if (i === queue.length) {
          dispatch(updateQueue([]));
          break;
        }
        setTimeout(async () => {
          if (queue[i]?.fetchType === 'spot') {
            const fetchedData = await api.spot(queue[i].promiseAllKey, queue[i].fetchName);

            if (fetchedData) {
              dispatch(updateSpotData(fetchedData));
              dispatch(updateFetchedStatus(true, fetchedData.fetchName));

              if (i === queue.length - 1) {
                dispatch(updateLoadingStatus(false));
              }
            }
          }

          if (queue[i]?.fetchType === 'series') {
            const fetchedData = await api.series(
              queue[i].promiseAllKey,
              queue[i].fetchName,
              queue[i].params
            );

            if (fetchedData) {
              dispatch(updateSeriesData(fetchedData));
              dispatch(updateFetchedStatus(true, fetchedData.fetchName));

              if (i === queue.length - 1) {
                dispatch(updateLoadingStatus(false));
              }
            }
          }
        }, 300 * i);
      }
    }
  }

  useEffect(() => {
    fetchInitial();
  }, []);

  useInterval(fetchApi, 5000, 1);
}
